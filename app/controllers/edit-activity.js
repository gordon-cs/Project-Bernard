import Ember from "ember";
import putAsync from "gordon360/utils/put-async";
import postFileAsync from "gordon360/utils/post-file-async";
import postAsync from "gordon360/utils/post-async";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        update() {
            let context = this;
            // Get all the values that can be entered in
            // If not entered in, use the value already being used
            let description = this.get("description");
            if (description == null || description == "") {
                description = this.get("model.activity.ActivityBlurb");
            }
            let pageUrl = this.get("pageUrl");
            if (pageUrl == null || pageUrl == "") {
                pageUrl = this.get("model.activity.ActivityURL");
            }
            let imageUrl = this.get("imageUrl");
            if (imageUrl == null || imageUrl == "") {
                imageUrl = this.get("model.activity.ActivityImage");
            }
            // Reset image to default
            let resetImage = function() {
                return postAsync("/activities/" + activityCode + "/image/reset", null, context);
            };
            // Upload image file
            // Resturns resolved promise if no image was selected
            let uploadImage = function() {
                let response = new Ember.RSVP.Promise(function(resolve, reject) {
                    resolve("No image");
                });
                let image = Ember.$("#file")[0].files[0];
                if (image != null) {
                    let imageValidation = validateImage(image); // See helper method on the bottom
                    if (imageValidation.isValid) {
                        let imageData = new FormData();
                        imageData.append(image.name, image); // Add the image to the FormData object
                        response = postFileAsync("/activities/" + context.get("model.activity.ActivityCode") +
                                "/image", imageData, context);
                    }
                    else {
                        context.set("errorMessage", imageValidation.validationMessage);
                    }
                }
                return response;
            };
            // Post new information
            let updateActivity = function() {
                let data = {
                    "ACT_CDE": context.get("model.activity.ActivityCode"),
                    "ACT_DESC": context.get("model.activity.ActivityDescription"),
                    "ACT_IMAGE": imageUrl,
                    "ACT_URL": pageUrl,
                    "ACT_BLURB": description
                };
                return putAsync("/activities/" + context.get("model.activity.ActivityCode"), data, context);
            };
            // Leave inputs blank and transition back to activity after post
            let transition = function() {
                context.set("description", null);
                context.set("pageUrl", null);
                context.set("imageUrl", null);
                context.set("use_default_image", null);
                context.transitionToRoute("/specific-activity/" + context.get("model.sessionCode") +
                        "/" + context.get("model.activity.ActivityCode"));
            }

            if (this.get("use_default_image")) {
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
function validateImage(file){
  let validFileExtensions = ['png','jpg','jpeg','bmp','gif'];
  let result = {
    isValid : true,
    validationMessage : ''
  };

  if(file == undefined) {
    result.isValid = false;
    result.validationMessage = "No image file was selected.";
    return result;
  }

  let fileExtentsion = file.name.split('.').pop() || '';
  // The extension is not in the list of valid extensions
  if(validFileExtensions.indexOf(fileExtentsion) === -1) {
    result.isValid = false;
    result.validationMessage = 'Unacceptable file extension.';
  }
  // File is greater than 100KB
  if(file.size > 100000) {
    result.isValid = false;
    result.validationMessage = 'Unacceptable file size.';
  }

  return result;
}
