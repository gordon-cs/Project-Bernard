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
        toggleRecievedTable() {
            $("#membership-requests-recieved-table").slideToggle();
            $("#recieved-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        toggleSentTable() {
            $("#membership-requests-sent-table").slideToggle();
            $("#sent-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        toggleAdminTable() {
            $("#admin-table").slideToggle();
            $("#admin-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        toggleRequestSent(item){
            let elements = $(item.target).nextAll();
            for(var i=0; i < 3; i++){
                if($(window).innerWidth() < 768){
                    $(elements[i]).slideToggle();
                }
            }
        },
        toggleEditProfilePictureModal(){
             $("#editProfilePictureModal").addClass("showModal");
             $('body').css('overflow','hidden');
        },
        cancelEditProfilePicture(){
            console.log(this.get("file"));
            this.set("description", null);
            this.set("pageUrl", null);
            this.set("file", null);
            this.set("defaultImage", false);
            this.set("errorMessage", null);
             $("#editProfilePictureModal").removeClass("showModal");
            console.log(this.get("file"));
            $('body').css('overflow','scroll');
            //TODO Get cropper to disappear after canceling upload
        },
        showEditLinksModal(){
            $("#editLinksModal").addClass("showModal");
            $('body').css('overflow','hidden');
        },
        hideEditLinksModal(){
            $("#editLinksModal").removeClass("showModal");
            $('body').css('overflow','scroll');
            let lastForm = this.get("lastForm");
            if(lastForm){
                lastForm.addClass("hide");
            }
        },
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
                    if(link.indexOf("https://www.facebook.com/") === 0){
                        linkToSend = link.substring(25);
                        return true;
                    } else {
                        errorHandler("Please enter your Facebook profile link");
                        return false;
                    }
                case "twitter":
                    if(link.indexOf("https://twitter.com/") === 0){
                        linkToSend = link.substring(20);
                        return true;
                    } else {
                        errorHandler("Please enter your Twitter profile link");
                        return false;
                    }
                case "linkedin":
                    if(link.indexOf("https://www.linkedin.com/in/") === 0){
                        linkToSend = link.substring(28);
                        return true;
                    } else {
                        errorHandler("Please enter your LinkedIn profile link");
                        return false;
                    }
                case "instagram":
                    if(link.indexOf("https://www.instagram.com/") === 0){
                        linkToSend = link.substring(26);
                        return true;
                    } else {
                        errorHandler("Please enter your Instagram profile link");
                        return false;
                    }
                }
            };

            let errorHandler = function(error){
                console.log(error);
            };

            let uploadLink = function() {
                return putAsync("/profiles/" + username + "/" + item.type.toLowerCase() + "/" + "id=100007230048375" + "/", link, context);
            };

            let errorChecks = function(){
                let passed = false;
                for(i = 0; i < linkPrefixes.length; i++) {
                    if(link.indexOf(linkPrefixes[i]) === 0) {
                        passed = true;
                    }
                }
                return passed;
            };

            if(errorChecks){
                console.log("GOOD LINK");
            }
            // uploadLink();
        },
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

            let transitionModal = function(user){
                $("#editProfilePictureModal").removeClass("showModal");
                $('body').css('overflow','scroll');
                $("#profilePicture").attr("src", user.ImagePath);
            }
            let getUserInfo = function() {
                return  getAsync("/profiles/" + context.get("session.data.authenticated.token_data.user_name").toLowerCase() + "/", context);
            }

            let askAgain = function(){
                let reason = {
                    responseText: "Please upload one of the supported image types"
                }
                showError(reason);
            };
            console.log("Starting");
            if (errorChecks()) {
                console.log("errorChecks passed");
                uploadImage()
                // .then(updateProfile)
                .then(function() {
                    console.log("uploaded image");
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
