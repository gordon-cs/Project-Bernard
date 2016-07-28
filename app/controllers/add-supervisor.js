import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import postAsync from "gordon360/utils/post-async";

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
            };

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
            };

            // Get the student from email
            let getPerson = function() {
                return getAsync("/accounts/email/" + email + "/", context).catch(showError);
            };

            // Send data for supervisor
            let postSupervisor = function(result) {
                let data = {
                    "ID_NUM": result.GordonID,
                    "SESS_CDE": sessionCode,
                    "ACT_CDE": activityCode
                };
                return postAsync("/supervisors", data, context).catch(showError);
            };

            // Leave inputs blank and transition back to activity
            let transition = function() {
                context.set("supervisorEmail", null);
                context.transitionToRoute("/specific-activity/" + sessionCode +
                        "/" + activityCode);
            };

            if (errorChecks()) {
                getPerson()
                .then(postSupervisor)
                .then(transition);
            }
        }
    }
});
