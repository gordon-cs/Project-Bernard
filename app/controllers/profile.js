import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";
import putAsync from "gordon360/utils/put-async";
import postFileAsync from "gordon360/utils/post-file-async";
import postAsync from "gordon360/utils/post-async";
import imageCropper from 'ember-cli-image-cropper/components/image-cropper';
import getAsync from "gordon360/utils/get-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {
        removeAdmin(id) {
            deleteAsync("/admins/" + id, this)
            .then(function() {
                window.location.reload(true);
            });
        },
        deleteRequest(requestID) {
            deleteAsync("/requests/" + requestID, this)
            .then(function() {
                 window.location.reload(true);
             });
        },
        // Shows and hides the table that shows membership requests recieved
        toggleRecievedTable() {
            $("#membership-requests-recieved-table").slideToggle();
            $("#recieved-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        // Shows and hides the table that shows membership requests sent
        toggleSentTable() {
            $("#membership-requests-sent-table").slideToggle();
            $("#sent-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        // Shows and hides the table that shows the system admins
        toggleAdminTable() {
            $("#admin-table").slideToggle();
            $("#admin-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        // On mobile displays dropdown with more info about the selected membership request
        toggleRequestSent(item){
            let elements = $(item.target).nextAll();
            for(var i=0; i < 3; i++){
                if($(window).innerWidth() < 768){
                    $(elements[i]).slideToggle();
                }
            }
        },
        
        // Shows the modal that holds the information to update profile picture
        showEditProfilePictureModal(){
             $("#editProfilePictureModal").addClass("showModal");
             $('body').css('position','fixed');
             $('body').css('overflow-y','scroll');
        },
        // Hides the modal that holds the information to update profile picture
        cancelEditProfilePicture(item){
            if(item.target == $(".profile-picture-cancel-button")[0] || item.target == $("#editProfilePictureModal").not(".modal-content")[0]){
                this.set("file", null);
                this.set("defaultImage", false);
                this.set("errorMessage", null);
                $("#editProfilePictureModal").removeClass("showModal");
                $('body').css('position','static');
                $('body').css('overflow-y','auto');
            }
            //TODO Get cropper to disappear after canceling upload
        },
        // Shows the modal that allows users to update social media links
        showEditLinksModal(){
            $("#editLinksModal").addClass("showModal");
            $('body').css('position','fixed');
            $('body').css('overflow-y','scroll');
        },
        // hides the modal that allows 
        hideEditLinksModal(item){
            if(item.target == $(".hide-links-modal-button")[0] || item.target == $("#editLinksModal").not(".modal-content")[0]){
                $("#editLinksModal").removeClass("showModal");
                $('body').css('position','static');
                $('body').css('overflow-y','auto');
                let lastForm = this.get("lastForm");
                if(lastForm){
                    lastForm.addClass("hide");
                }
                this.set("linksErrorMessage", "");
                this.set("linksSuccessMessage", "");
            }
        },
        // Displays the form to change a specific social media link
        // Also hides the last open form
        changeSocialMediaLink(linkItem, item){    
            let LinkToUse;        
            let lastForm = this.get("lastForm");
            let form = $(item.target).parent().parent().next();
            if(lastForm){
                lastForm.addClass("hide");
            }
            if(linkItem.link) {
                LinkToUse = linkItem.linkPrefixes[linkItem.prefixNum];
                LinkToUse = LinkToUse + decodeURIComponent(linkItem.link);
            }
            this.set("model.link", LinkToUse);
            this.set("lastForm", form);
            form.removeClass("hide");
        },

        //Change the privacy value for a club membership
        toggleClubPrivacy(activity) {
            let newPrivacy = !activity.membership.Privacy;
            let context = this;
            let setPrivacy = function(value) {
                return putAsync("/memberships/" + activity.membership.MembershipID + "/privacy/" + value, value, context).catch((reason) => {
                    console.log(reason);
                    //TODO handle error
                });
            }
            let transition = function() {
                activity.set("membership.Privacy", newPrivacy);
            }
            setPrivacy(newPrivacy)
            .then(transition);
        },

        //Change the privacy value for profile picture
        setPicturePrivacy() {
            let context = this;
            let currentPrivacy = context.get("model.userInfo.show_img");
            let newPrivacy = !currentPrivacy;
            let successMessage;
            let setPrivacy = function(value) {
                return putAsync("/profiles/image_privacy/" + value, value, context).catch((reason) => {
                    console.log(reason);
                    //TODO handle error
                });
            };
            let transition = function() {
                context.set("model.userInfo.show_img", newPrivacy);
                if(newPrivacy) {
                    successMessage = "Your profile picture is now visible on your public profile page";
                } else {
                    successMessage = "Your profile picture is no longer visible on your public profile page";
                }
                context.set("profilePictureSuccessMessage", successMessage);
            };
            
            setPrivacy(newPrivacy)
            .then(transition);
        },
        toggleMobilePhonePrivacy() {
            let context = this;
            let currentPrivacy = context.get("model.userInfo.IsMobilePhonePrivate");
            let newPrivacy = ! currentPrivacy;
            let successMessage;
            let setPrivacy = function(value) {
                return putAsync("/profiles/mobile_privacy/" + value, value, context).catch((reason) => {
                    console.log(reason);
                    //TODO handle error
                });
            };
            let transition = function() {
                context.set("model.userInfo.IsMobilePhonePrivate", newPrivacy);
                if(!newPrivacy) {
                    successMessage = "Your mobile phone number is now visible on your public profile page";
                } else {
                    successMessage = "Your mobile phone number is no longer visible on your public profile page";
                }
                context.set("phonePrivacySuccessMessage", successMessage);
            };
            setPrivacy(newPrivacy)
            .then(transition);
        },

        /***********************************
        // Logic to update a social media link
        ***********************************/

        updateLinks(action, item) {
            let context = this;
            let username = context.get("session.data.authenticated.token_data.user_name");
            let link = context.get("model.link");
            let type = item.type.toLowerCase();
            let linkPrefixes =  item.linkPrefixes;
            let prefixNum = item.prefixNum;
            let linkToSend;

            //Get link ready to send to API
            let prepareLink = function() {
                
                switch(type) {
                case "facebook":
                        linkToSend = link.substring(25);
                        break;
                case "twitter":
                        linkToSend = link.substring(20);
                        if(linkToSend.indexOf("?") > 0){
                            linkToSend = linkToSend.slice(0, linkToSend.indexOf("?"));
                        }
                        break;
                case "linkedin":
                        linkToSend = link.substring(28);
                        if(linkToSend.slice(-1) === "/"){
                            linkToSend = linkToSend.slice(0, -1);
                        }
                        break;
                case "instagram":
                        linkToSend = link.substring(26);
                        break;
                };

                linkToSend = encodeURIComponent(linkToSend);

            };

            // Send link to API
            let uploadLink = function(data) {
                let url = {
                    [type]: data
                }
                return putAsync("/profiles/" + type, url, context).catch((reason) => {
                    showError(reason);
                });
            };

            // Make sure link passed starts with one of the specified link prefixes
            let errorChecks = function(){
                let passed = false;
                if(link.indexOf(linkPrefixes[prefixNum]) ===0 ){
                    passed = true;
                }
                return passed;
            };

            // If error checks fail, display message to user to ask for another link
            let askAgain = function(){
                let reason = {
                    responseText: "Please use your " + type + " profile link"
                }
                showError(reason);
            };

            // Display error to user
            let showError = function(result) {
                context.set("linksErrorMessage", new Error(result.responseText));
            };

            // If link updates correctly show success message to user
            let showSuccess = function() {
                context.set("linksSuccessMessage", "You have " + action + " your " + item.type + " profile link!");
            };

            // Change UI when link is changed
            let transition = function() {
                if(action ==="updated"){
                    let linkToDisplay = decodeURIComponent(linkToSend);
                    item.set("link", linkToDisplay);
                }else {
                    item.set("link", null);
                }
                context.set("model.userInfo."+item.type, linkToSend);
                let form = context.get("lastForm");
                if(form){
                    form.addClass("hide");
                }
                context.set("linksErrorMessage", null);
                showSuccess();
            };

            // Run everything
            if(action === "updated"){
                if(errorChecks()){
                    prepareLink();
                    uploadLink(linkToSend)
                    .then(transition);
                } else {
                    askAgain();
                }
            } else {
                uploadLink(null)
                .then(transition);
            }
        },
        
        /***********************************
        // Logic to update profile picture
        ***********************************/
        
        updatePicture() {

            let context = this;

            // Get the picture submitted by user
            let image = Ember.$("#file")[0].files[0];

            let error = false;

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
            };

            // convert data to blob
            function dataURItoBlob(dataURI) {
                // convert base64/URLEncoded data component to raw binary data held in a string
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type:mimeString});
            }

            // Upload image file
            // Resturns resolved promise if no image was selected
            let uploadImage = function() {
                let image = Ember.$("#file")[0].files[0];


                    // let imageValidation = validateImage(image);

                     // See helper method on the bottom
                        let dataUrl = $("#image-to-crop").cropper('getCroppedCanvas', {
                            width: 320,
                            height: 320
                        }).toDataURL('image/jpg');
                        let blob = dataURItoBlob(dataUrl);
                        let blobName = "canvasImage.jpg";
                        let imageData = new FormData();

                        imageData.append("canvasImage", blob, "canvasImage.jpg");

                        return postFileAsync("/profiles/" + "image", imageData, context).catch((reason) => {
                            error = true;
                            showError(reason);
                        });
                    
            };

            //Check to make sure a valid file was selected
            let errorChecks = function() {
                error = false;
                let passed = true;
                if(image){
                    if(image.type === "image/png" || image.type === "image/jpg" || image.type === "image/jpeg" || image.type === "image/bmp" || image.type === "image/gif") {
                        passed = true;
                    }else {
                        passed = false;
                    }
                } else {
                    passed = false;
                }
                return passed;
            };

            // Leave inputs blank and transition back to activity after post
            let transition = function() {
                context.set("file", "");
                context.set("errorMessage", null);
                return getUserInfo()
                .then(transitionModal);
            };

            // Gets the user info so that the new profile image can be displayed.
            let getUserInfo = function() {
                return  getAsync("/profiles/", context);
            }

            // hides the modal and changes the picture on page to reflect the new change
            let transitionModal = function(user){
                $("#editProfilePictureModal").removeClass("showModal");
                $('body').css('overflow','scroll');
                $("#profilePicture").attr("src", user.ImagePath);
            }
            
            // Show error
            let askAgain = function(){
                let reason = {
                    responseText: "Please upload one of the supported image types"
                }
                showError(reason);
            };

            if (errorChecks()) {
                uploadImage()
                .then(function() {
                    if (! error) {
                        transition();
                    }
                });
            } else{
                askAgain();
            }
        },
    }
});
