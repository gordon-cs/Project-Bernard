import Ember from "ember";
import putAsync from "gordon360/utils/put-async";
import postFileAsync from "gordon360/utils/post-file-async";
import postAsync from "gordon360/utils/post-async";

/*  Controller for the edit activity page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    errorMessage: null,
    defaultImage: false,
    actions: {
        update() {

            let context = this;
            let urlValid = false;
            let imgValid = true;

            // Get all the values that can be entered in
            // If not entered in, use the value already being used
            let description = this.get("description");
            if (description == null || description == "") {
                description = this.get("model.activity.ActivityBlurb");
            }
            let pageUrl = this.get("pageUrl");
            if (pageUrl == null || pageUrl == "") {
                pageUrl = this.get("model.activity.ActivityURL");
                urlValid = true;
            }
            else if (pageUrl.includes("http://", 0) || pageUrl.includes("https://", 0)) {
                urlValid = true;
            }
            else {
                urlValid = false;
                this.set("errorMessage", "Enter the full activity URL: Beginning with http://");
            }

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
            };

            // Reset image to default
            let resetImage = function() {
                return postAsync("/activities/" + context.model.activity.ActivityCode + "/image/reset", null, context).catch(showError);
            };

            // Upload image file
            // Resturns resolved promise if no image was selected
            let uploadImage = function() {
                let image = Ember.$("#file")[0].files[0];
                if (image != null) {
                    let imageValidation = validateImage(image); // See helper method on the bottom
                    if (imageValidation.isValid) {
                        let imageData = new FormData();
                        imageData.append(image.name, image); // Add the image to the FormData object
                        return postFileAsync("/activities/" + context.get("model.activity.ActivityCode") +
                                "/image", imageData, context).catch(showError);
                    }
                    else {
                        context.set("errorMessage", imageValidation.validationMessage);
                        return new Ember.RSVP.Promise(function(resolve, reject) {
                            reject();
                        });
                    }
                }
                else { // No image was selected
                    return new Ember.RSVP.Promise(function(resolve, reject) {
                        resolve();
                    });
                }
            };
            // Post new information
            let updateActivity = function() {
                let data = {
                    "ACT_CDE": context.get("model.activity.ActivityCode"),
                    "ACT_URL": pageUrl,
                    "ACT_BLURB": description
                };
                return putAsync("/activities/" + context.get("model.activity.ActivityCode"), data, context).catch(showError);
            };
            // Leave inputs blank and transition back to activity after post
            let transition = function() {
                context.set("description", null);
                context.set("pageUrl", null);
                context.set("file", "");
                context.set("defaultImage", false);
                context.transitionToRoute("/specific-activity/" + context.get("model.sessionCode") +
                        "/" + context.get("model.activity.ActivityCode"));
            };

            if (this.get("defaultImage")) {
                resetImage()
                .then(updateActivity)
                .then(transition);
            }
            else {
                uploadImage()
                .then(updateActivity)
                .then(transition);
            }
        }
    }
});


/* HELPER METHODS */
// Validate the selected image
function validateImage(file) {
    let validFileExtensions = ['png','jpg','jpeg','bmp','gif'];
    let result = {
        isValid : true,
        validationMessage : ''
    };
    let fileExtentsion = file.name.split('.').pop() || '';
    if (file == undefined) {
        result.isValid = false;
        result.validationMessage = "No image file was selected";
        return result;
    }
    // The extension is not in the list of valid extensions
    if(validFileExtensions.indexOf(fileExtentsion) === -1) {
        result.isValid = false;
        result.validationMessage = 'Unacceptable image file: Use only .png, .jpg, .jpeg, .bmp, or .gif images.';
    }
    // File is greater than 100KB
    if(file.size > 100000) {
        result.isValid = false;
        result.validationMessage = 'Unacceptable file size: May be no greater than 100KB.';
    }

    return result;
}
