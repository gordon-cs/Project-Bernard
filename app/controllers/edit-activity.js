import Ember from "ember";
import putSync from "gordon360/utils/put-sync";
import postFileSync from "gordon360/utils/post-file-sync";

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

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        update() {
            // Get all values
            // If not entered, use previous value
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

            /* Image Upload */
            let image = Ember.$("#file")[0].files[0];
            let imageValidation = validateImage(image);
            if (imageValidation.isValid) {
              console.log(image);
              let imageData = new FormData();
              imageData.append(image.name, image);
              let activityCode = this.get("model.activity.ActivityCode");
              let response = postFileSync('/activities/'+activityCode+'/image', imageData, this);
            }
            else{
              console.log(imageValidation.validationMessage + '\nNo image will be uploaded.');
            }


            let data = {
                "ACT_CDE": this.get("model.activity.ActivityCode"),
                "ACT_DESC": this.get("model.activity.ActivityDescription"),
                "ACT_IMAGE": imageUrl,
                "ACT_URL": pageUrl,
                "ACT_BLURB": description
            };
            console.log(data);
            let response = putSync("/activities/" + this.get("model.activity.ActivityCode"), data, this);
            if (response.success) {
                this.set("description", null);
                this.set("pageUrl", null);
                this.set("imageUrl", null);
                this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                        "/" + this.get("model.activity.ActivityCode"));
            }
            else {
                this.set("errorMessage", JSON.parse(response.data.responseText).error_description);
            }
        }
    }
});
