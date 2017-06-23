import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";
import putAsync from "gordon360/utils/put-async";
import postFileAsync from "gordon360/utils/post-file-async";
import postAsync from "gordon360/utils/post-async";
import imageCropper from 'ember-cli-image-cropper/components/image-cropper';

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
             $("#toggleEditProfilePictureModal").addClass("showModal");
              console.log("This is my image");
        },
        cancelEditProfilePicture(){
            console.log(this.get("file"));
            this.set("description", null);
            this.set("pageUrl", null);
            this.set("file", null);
            this.set("defaultImage", false);
            this.set("errorMessage", null);
             $("#toggleEditProfilePictureModal").removeClass("showModal");
            console.log(this.get("file"));
        },
        update() {

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

                        return postFileAsync("/profile/" + context.get("model.userInfo.EmailUserName") +
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
                transitionModal();
            };

            let transitionModal = function(){
                $("#toggleEditProfilePictureModal").removeClass("showModal");
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
