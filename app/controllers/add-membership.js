import Ember from "ember";
import postSync from "gordon360/utils/post-sync";
import getAsync from "gordon360/utils/get-async";
import postAsync from "gordon360/utils/post-async";

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
                if (role == null) {
                    passed = false;
                    context.set("errorMessage", "Please enter a participation level");
                }
                else if (comments.length > 45) {
                    passed = false;
                    context.set("errorMessage", "Comment is too long. Max length 45 characters");
                }
                if (leading) {
                    if (email == null || email == "") {
                        passed = false;
                        context.set("errorMessage", "Please enter a student email");
                    }
                    if (email.indexOf("@gordon.edu") === -1) {
                        email = email + "@gordon.edu";
                    }
                }
                return passed;
            }

            // Get the student from email
            let getStudent = function() {
                return getAsync("/accounts/email/" + email + "/", context);
            }

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
                let response = postAsync("/memberships", data, context);
                if (response.status === 500) {
                    context.set("errorMessage", "An error has occured");
                }
                return response;
            }

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
                return postSync("/requests", data, context);
            }

            // Checks after the post
            let postErrorChecks = function(result) {
                if (result) {
                    context.set("studentEmail", null);
                    context.set("role", null);
                    context.set("comments", null);
                    context.transitionToRoute("/specific-activity/" + sessionCode +
                            "/" + activityCode);
                }
                else {
                    context.set("errorMessage", "An error has occured");
                }
            }

            if (errorChecks()) {
                if (this.get("model.leading")) {
                    getStudent()
                    .then(postMembership)
                    .then(postErrorChecks);
                }
                else {
                    postRequest()
                    .then(postErrorChecks);
                }
            }
        }
    }
});
