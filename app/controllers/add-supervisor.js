import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import postSync from "gordon360/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    errorMessage: null,
    /* All the actions that can be called from interaction with add-supervisor.hbs */
    actions: {
        post() {
            this.set("errorMessage", null);
            let context = this;
            // Data to be sent
            let data = {};
            let email = this.supervisorEmail;
            let sessionCode = this.model.sessionCode;
            let activityCode = this.model.activity.ActivityCode;
            // response
            let postResponse;

            // Check if all the inputs are valid
            let errorChecks = function() {
                let passed = true;
                if (email == null || email == "") {
                    passed = false;
                    context.set("errorMessage", "Invalid email address");
                }
                else if (email.indexOf("@gordon.edu") === -1) {
                    email = email + "@gordon.edu";
                }
                return passed;
            }

            // Check for error after post
            let postErrorChecks = function() {
                if (postResponse != null) {
                    context.set("supervisorEmail", null);
                    context.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                            "/" + this.get("model.activity.ActivityCode"));
                }
                else {
                    context.set("errorMessage", "Invalid email address");
                }
            }

            // Get the student from email
            let getPerson = function() {
                return getAsync("/accounts/email/" + email + "/", context);
            }

            // Send data for supervisor
            let postSupervisor = function(result) {
                let data = {
                    "ID_NUM": result.GordonID,
                    "SESS_CDE": sessionCode,
                    "ACT_CDE": activityCode
                };
                postResponse = postSync("/supervisors", data, context);
            }

            if (errorChecks()) {
                getPerson()
                .then(postSupervisor);
                postErrorChecks();
            }
        }
    }
});
