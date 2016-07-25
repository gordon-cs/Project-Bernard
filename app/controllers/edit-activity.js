import Ember from "ember";
import putSync from "gordon360/utils/put-sync";
import postFileSync from "gordon360/utils/post-file-sync";
import postSync from "gordon360/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    errorMessage: null,
    actions: {
        update() {

            let urlCheck = false;

            // Get all the values that can be entered in
            // If not entered in, use the value already being used
            let description = this.get("description");
            if (description == null || description == "") {
                description = this.get("model.activity.ActivityBlurb");
            }
            let pageUrl = this.get("pageUrl");
            if (pageUrl == null || pageUrl == "") {
                pageUrl = this.get("model.activity.ActivityURL");
                urlCheck = true;
            }
            else if (pageUrl.includes("http://", 0) || pageUrl.includes("https://", 0)) {
                console.log("good url");
                urlCheck = true;
            }
            else {
                console.log("bad");
                urlCheck = false;
                this.set("errorMessage", "Enter the full activity URL, beginning with http://");
            }
            let imageUrl = this.get("imageUrl");
            if (imageUrl == null || imageUrl == "") {
                imageUrl = this.get("model.activity.ActivityImage");
            }

            let activityCode = this.get("model.activity.ActivityCode");

            /* Image Upload */
            if(this.get("use_default_image")) {
              let response = postSync('/activities/'+activityCode+'/image/reset',null,this);
            }
            else {
              let image = Ember.$("#file")[0].files[0];
              let imageValidation = validateImage(image); // See helper method on the bottom
              if (imageValidation.isValid) {
                let imageData = new FormData();
                imageData.append(image.name, image); // Add the image to the FormData object
                let imageUpload = postFileSync('/activities/'+activityCode+'/image', imageData, this);
              }
              else{
                // TODO alert the user that upload validation failed.
                console.log(imageValidation.validationMessage + '\nNo image will be uploaded.');
              }
            }
            /* End Image Upload */

            // Set data to be sesnt in PUT API call
            let data = {
                "ACT_CDE": this.get("model.activity.ActivityCode"),
                "ACT_DESC": this.get("model.activity.ActivityDescription"),
                "ACT_IMAGE": imageUrl,
                "ACT_URL": pageUrl,
                "ACT_BLURB": description
            };

            if (urlCheck) {
                // Make the API call
                let response = putSync("/activities/" + this.get("model.activity.ActivityCode"), data, this);

                /* If the call was successful - transition back to previous page
                 * Else - throw an error message
                 */
                if (response.success) {
                    this.set("description", null);
                    this.set("pageUrl", null);
                    this.set("imageUrl", null);
                    this.set("use_default_image", null);
                    this.set("errorMessage", null);
                    this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                            "/" + this.get("model.activity.ActivityCode"));
                }
                else {
                    this.set("errorMessage", JSON.parse(response.data.responseText).error_description);
                }
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
