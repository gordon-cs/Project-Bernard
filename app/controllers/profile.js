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
             $('body').css('overflow','hidden');
        },
        // Hides the modal that holds the information to update profile picture
        cancelEditProfilePicture(){
            this.set("file", null);
            this.set("defaultImage", false);
            this.set("errorMessage", null);
             $("#editProfilePictureModal").removeClass("showModal");
            $('body').css('overflow','scroll');
            //TODO Get cropper to disappear after canceling upload
        },
        // Shows the modal that allows users to update social media links
        showEditLinksModal(){
            $("#editLinksModal").addClass("showModal");
            $('body').css('overflow','hidden');
        },
        // hides the modal that allows 
        hideEditLinksModal(){
            $("#editLinksModal").removeClass("showModal");
            $('body').css('overflow','scroll');
            let lastForm = this.get("lastForm");
            if(lastForm){
                lastForm.addClass("hide");
            }
        },
        // Displays the form to change a specific social media link
        // Also hides the last open form
        changeSocialMediaLink(item){
            let lastForm = this.get("lastForm");
            if(lastForm){
                lastForm.addClass("hide");
            }
            this.set("model.link", "");
            let form = $(item.target).parent().parent().next();
            this.set("lastForm", form);
            form.removeClass("hide");
        },
        // Logic to update a social media link
        updateLinks(item) {
            let context = this;
            let username = context.get("session.data.authenticated.token_data.user_name");
            let link = context.get("model.link");
            let type = item.type.toLowerCase();
            let linkPrefixes = ["https://www.facebook.com/", "https://twitter.com/","https://www.linkedin.com/in/","https://www.instagram.com/"];
            let linkToSend;

            let prepareLink = function() {
                
                switch(type) {
                case "facebook":
                        linkToSend = link.substring(25);
                        break;
                case "twitter":
                        linkToSend = link.substring(20);
                        break;
                case "linkedin":
                        linkToSend = link.substring(28);
                        break;
                case "instagram":
                        linkToSend = link.substring(26);
                        break;
                };


            };

            let uploadLink = function(data) {
                console.log(data);
                let url = {
                    [type]: data
                }
                return putAsync("/profiles/" + username + "/" + type, url, context).catch((reason) => {
                    showError(reason);
                });
            };

            // Make sure link passed 
            let errorChecks = function(){
                let passed = false;
                if(type === "facebook"){
                    if((link.indexOf(linkPrefixes[0]) === 0)){
                        passed = true
                    }
                }
                if(type === "twitter"){
                    if((link.indexOf(linkPrefixes[1]) === 0)){
                        passed = true
                    }
                }
                if(type === "linkedin"){
                    if((link.indexOf(linkPrefixes[2]) === 0)){
                        passed = true
                    }
                }
                if(type === "instagram"){
                    if((link.indexOf(linkPrefixes[3]) === 0)){
                        passed = true
                    }
                }
                return passed;
            };

            let askAgain = function(){
                let reason = {
                    responseText: "Please use your " + type + " profile link"
                }
                showError(reason);
            };

            let showError = function(result) {
                context.set("linksErrorMessage", new Error(result.responseText));
            };

            let showSuccess = function() {
                context.set("linksSuccessMessage", "You have updated your " + item.type + " profile link!");
            };

            let transition = function() {
                context.set("model.userInfo."+item.type, linkToSend);
                console.log(context);
                let form = context.get("lastForm");
                form.addClass("hide");
                showSuccess();
            };

            if(errorChecks){
                console.log("GOOD LINK");
                prepareLink();
                uploadLink(linkToSend)
                .then(transition);
            } else {
                askAgain();
            }
        },
        // Logic to update profile picture
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

                    console.log("uploading image");

                    // let imageValidation = validateImage(image);

                     // See helper method on the bottom
                        let dataUrl = $("#image-to-crop").cropper('getCroppedCanvas', {
                            width: 320,
                            height: 320
                        }).toDataURL('image/jpeg');
                        let blob = dataURItoBlob(dataUrl);
                        let blobName = "canvasImage.jpeg";
                        console.log(blob);
                        let imageData = new FormData();

                        imageData.append("canvasImage", blob, "canvasImage.jpeg");
                        console.log(imageData);

                        return postFileAsync("/profiles/" + context.get("model.userInfo.EmailUserName") +
                          "/image", imageData, context).catch((reason) => {
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
                return  getAsync("/profiles/" + context.get("session.data.authenticated.token_data.user_name").toLowerCase() + "/", context);
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
