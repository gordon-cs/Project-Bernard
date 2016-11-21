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

            // Get all the values that can be entered in
            // If not entered in, use the value already being used
            let description = this.get("model.description");
            let pageUrl = this.get("model.pageUrl");

            let error = false;

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
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
                                "/image", imageData, context).catch((reason) => {
                            error = true;
                            showError(reason);
                        });
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
            let errorChecks = function() {
                error = false;
                let passed = true;
                let regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

                if (pageUrl != "" && ! pageUrl.includes("http://", 0) && ! pageUrl.includes("https://", 0)) {
                    context.set("errorMessage", "URL must begin with http://");
                    passed = false;
                }
                else if (pageUrl != "" && ! regexUrl.test(pageUrl)) {
                    context.set("errorMessage", "Invalid website URL");
                    passed = false;
                }

                return passed;
            };
            // Post new information
            let updateActivity = function() {
                let data = {
                    "ACT_CDE": context.get("model.activity.ActivityCode"),
                    "ACT_URL": pageUrl,
                    "ACT_BLURB": description
                };
                return putAsync("/activities/" + context.get("model.activity.ActivityCode"), data, context).catch((reason) => {
                    error = true;
                    showError(reason);
                });
            };
            // Leave inputs blank and transition back to activity after post
            let transition = function() {
                context.set("description", null);
                context.set("pageUrl", null);
                context.set("file", "");
                context.set("defaultImage", false);
                context.set("errorMessage", null);
                context.transitionToRoute("/specific-activity/" + context.get("model.sessionCode") +
                        "/" + context.get("model.activity.ActivityCode"));
            };

            if (errorChecks()) {
                uploadImage()
                .then(updateActivity)
                .then(function() {
                    if (! error) {
                        transition();
                    }
                });
            }
        },
        cancel() {
            this.set("description", null);
            this.set("pageUrl", null);
            this.set("file", "");
            this.set("defaultImage", false);
            this.set("errorMessage", null);
            this.transitionToRoute("/specific-activity/" + this.model.sessionCode +
                  "/" + this.model.activity.ActivityCode);
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
        result.validationMessage = 'File too large, must be < 100KB.';
    }

    return result;
}
