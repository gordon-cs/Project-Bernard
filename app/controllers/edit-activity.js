import Ember from "ember";
import putSync from "gordon360/utils/put-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        update() {
            // Get all the values that can be entered in
            // If not entered in, use the previous value associated with it
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
            // Set data to be sesnt in PUT API call
            let data = {
                "ACT_CDE": this.get("model.activity.ActivityCode"),
                "ACT_DESC": this.get("model.activity.ActivityDescription"),
                "ACT_IMAGE": imageUrl,
                "ACT_URL": pageUrl,
                "ACT_BLURB": description
            };
            console.log(data);
            // Make the API call
            let response = putSync("/activities/" + this.get("model.activity.ActivityCode"), data, this);
            
            /* If the call was successful - transition back to previous page
             * Else - throw an error message
             */
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
