import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import postAsync from "gordon360/utils/post-async";

/*  Controller for the add membership page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    role: null,
    errorMessage: null,
    /* All the actions that can be called from interaction with add-membership.hbs */
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        post() {
            this.set("errorMessage", null);
            let context = this;
            let leading = this.model.leading;
            // Post data
            let data = {};
            let comments = this.comments || "";
            let email = this.studentEmail;
            let role = this.role;
            let activityCode = this.model.activity.ActivityCode;
            let sessionCode = this.model.sessionCode;
            let IDNumber = this.get("session.data.authenticated.token_data.id");

            // Check if all the inputs are valid
            let errorChecks = function() {
                let passed = true;
                let regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                if (role == null) {
                    passed = false;
                    context.set("errorMessage", "Participation level required");
                }
                else if (comments.length > 45) {
                    passed = false;
                    context.set("errorMessage", "Comment too long. Max length 45 characters");
                }
                if (leading) {
                    if (email == null || email == "") {
                        passed = false;
                        context.set("errorMessage", "Email required");
                    }
                    if (email.indexOf("@gordon.edu") === -1) {
                        email = email + "@gordon.edu";
                    }
                    if (! regexEmail.test(email)) {
                        context.set("errorMessage", "Invalid email");
                        passed = false;
                    }
                }
                return passed;
            };

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
            };

            // Get the student from email
            let getStudent = function() {
                return getAsync("/accounts/email/" + email + "/", context).catch(showError);
            };

            // Send data for membership
            let postMembership = function(result) {
                let data = {
                    "ACT_CDE": activityCode,
                    "SESS_CDE": sessionCode,
                    "ID_NUM": result.GordonID,
                    "PART_CDE": role.ParticipationCode,
                    "BEGIN_DTE": new Date().toJSON(),
                    "END_DTE": new Date().toJSON(),
                    "COMMENT_TXT": comments
                };
                return postAsync("/memberships", data, context).catch(showError);
            };

            // Send data for membership request
            let postRequest = function() {
                let data = {
                    "ACT_CDE": activityCode,
                    "SESS_CDE": sessionCode,
                    "ID_NUM": IDNumber,
                    "PART_CDE": role.ParticipationCode,
                    "DATE_SENT": new Date().toJSON(),
                    "COMMENT_TXT": comments,
                    "APPROVED": "Pending"
                };
                return postAsync("/requests", data, context).catch(showError);
            };

            // Leave inputs blank and transition back to activity
            let transition = function(result) {
                context.set("studentEmail", null);
                context.set("role", null);
                context.set("comments", null);
                context.set("errorMessage", null);
                context.transitionToRoute("/specific-activity/" + sessionCode +
                        "/" + activityCode);
            };

            if (errorChecks()) {
                if (this.get("model.leading")) {
                    getStudent()
                    .then(postMembership)
                    .then(transition);
                }
                else {
                    postRequest()
                    .then(transition);
                }
            }
        },
        cancel() {
            this.set("studentEmail", null);
            this.set("role", null);
            this.set("comments", null);
            this.set("errorMessage", null);
            this.transitionToRoute("/specific-activity/" + this.model.sessionCode +
                  "/" + this.model.activity.ActivityCode);
        }
    }
});
