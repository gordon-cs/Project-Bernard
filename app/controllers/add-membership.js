import Ember from "ember";
import postSync from "gordon360/utils/post-sync";
import getAsync from "gordon360/utils/get-async";

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
            // Response
            let postResponse;

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
                if (result) {
                    let data = {
                        "ACT_CDE": activityCode,
                        "SESS_CDE": sessionCode,
                        "ID_NUM": result.GordonID,
                        "PART_CDE": role.ParticipationCode,
                        "BEGIN_DTE": new Date().toJSON(),
                        "END_DTE": new Date().toJSON(),
                        "COMMENT_TXT": comments
                    };
                    postResponse = postSync("/memberships", data, context);
                }
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
                postResponse = postSync("/requests", data, context);
            }

            if (errorChecks()) {
                if (this.get("model.leading")) {
                    getStudent()
                    .then(postMembership);
                }
                else {
                    postRequest();
                }
                if (postResponse.success) {
                    this.set("studentEmail", null);
                    this.set("role", null);
                    this.set("comments", null);
                    this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                            "/" + this.get("model.activity.ActivityCode"));
                }
                else {
                    this.set("errorMessage", "An error has occured");
                }
            }
        }
    }
});
