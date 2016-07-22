import Ember from "ember";
import getSync from "gordon360/utils/get-sync";
import postSync from "gordon360/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    errorMessage: null,
    /* All the actions that can be called from interaction with add-supervisor.hbs */
    actions: {
        post() {
            this.set("errorMessage", null);
            let data = {};
            let url = null;

            // Get the new activity supervisor by email
            let email = this.get("supervisorEmail");
            if (email == null) {
                this.set("errorMessage", "Please enter an email");
            }
            else {
                if (email.indexOf("@gordon.edu") === -1) {
                    email = email + "@gordon.edu";
                }

                // Lookup the user by email
                let getResponse = getSync("/accounts/email/" + email + "/", this);
                let supervisor = getResponse.data;

                // If the lookup was successful
                if (getResponse.success) {
                    // Set the data to be sent in post
                    data = {
                        "ID_NUM": supervisor.GordonID,
                        "SESS_CDE": this.get("model.sessionCode"),
                        "ACT_CDE": this.get("model.activity.ActivityCode")
                    };
                    // Set the URL extension
                    url = "/supervisors";

                    // Make API POST call
                    let postResponse = postSync(url, data, this);

                    // If the call was successful transition back to activity
                    if (postResponse.success) {
                        this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                            "/" + this.get("model.activity.ActivityCode"));
                    }
                    // If the call was unsuccessful give an error
                    else {
                        this.set("errorMessage", "An error has occured");
                    }
                }
                // If the lookup was unsuccessful give an error
                else {
                    this.set("errorMessage", "Invalid email address");
                }
            }
        }
    }
});
