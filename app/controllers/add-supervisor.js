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

            /* If the email field was left blank - throw an error
             * Else carry on
             */
            if (email == null || email == "") {
                this.set("errorMessage", "Please enter an email");
            }
            else {
                // If the entered email is missing the domain, add it in
                if (email.indexOf("@gordon.edu") === -1) {
                    email = email + "@gordon.edu";
                }

                // Lookup the user by email
                let getResponse = getSync("/accounts/email/" + email + "/", this);
                let supervisor = getResponse.data;

                /* If the lookup was successful - move forward with API calls
                 * Else - throw an errorMessage
                 */
                if (getResponse.success) {
                    // Data to be sent in POST
                    data = {
                        "ID_NUM": supervisor.GordonID,
                        "SESS_CDE": this.get("model.sessionCode"),
                        "ACT_CDE": this.get("model.activity.ActivityCode")
                    };
                    // Set the URL extension
                    url = "/supervisors";

                    // Make API POST call
                    let postResponse = postSync(url, data, this);

                    /* If the call was successful - transition back to activity
                     * Else - throw an error
                     */
                    if (postResponse.success) {
                        this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                            "/" + this.get("model.activity.ActivityCode"));
                    }
                    else {
                        this.set("errorMessage", "An error has occured");
                    }
                }
                else {
                    this.set("errorMessage", "Invalid email address");
                }
            }
        }
    }
});
