import Ember from "ember";
import putSync from "gordon360/utils/put-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        update() {
            // Get all values
            // If not entered, use previous value
            let description = this.get("description");
            if (description == null) {
                description = this.get("model.activity.ActivityBlurb");
            }
            let pageUrl = this.get("pageUrl");
            if (pageUrl == null) {
                pageUrl = this.get("model.activity.ActivityURL");
            }
            let imageUrl = this.get("imageUrl");
            if (imageUrl == null) {
                imageUrl = this.get("model.activity.ActivityImage");
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
                this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                        "/" + this.get("model.activity.ActivityCode"));
            }
            else {
                this.set("errorMessage", JSON.parse(response.data.responseText).error_description);
            }
        }
    }
});
