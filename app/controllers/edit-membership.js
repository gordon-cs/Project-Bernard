import Ember from "ember";
import putAsync from "gordon360/utils/put-async";

/*  Controller for the edit membership page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    role: null,
    errorMessage: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        // Function called to update a membership
        update() {
            let context = this;

            let membershipID = this.get("model.membership.MembershipID");
            let studentID = this.get("model.membership.IDNumber");
            let comments = this.get("comments") || "";
            let roleID = this.get("role.ParticipationCode");
            // Check for input errors
            let errorChecks = function() {
                let passed = true;
                if (roleID == null) {
                    passed = false;
                    context.set("errorMessage", "Participation level required");
                }
                if (comments.length > 45) {
                    passed = false;
                    context.set("errorMessage", "Comment too long. Max length 45 characters");
                }
                return passed;
            };

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
            };

            // Send updated data
            let updateMembership = function() {
                let data = {
                    "MEMBERSHIP_ID": membershipID,
                    "ACT_CDE": context.get("model.membership.ActivityCode"),
                    "SESS_CDE": context.get("model.membership.SessionCode"),
                    "ID_NUM": studentID,
                    "PART_CDE": roleID,
                    "BEGIN_DTE": new Date().toJSON(),
                    "END_DTE": new Date().toJSON(),
                    "COMMENT_TXT": comments
                };

                return putAsync("/memberships/" + membershipID, data, context).catch(showError);
            };

            // Transition back to activity
            let transition = function() {
                context.set("role", null);
                context.set("comments", null);
                context.set("errorMessage", null);
                let activityCode = context.get("model.membership.ActivityCode");
                let sessionCode = context.get("model.membership.SessionCode");
                context.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            };

            if (errorChecks()) {
                updateMembership()
                .then(transition);
            }
        },
        cancel() {
            this.set("role", null);
            this.set("comments", null);
            this.set("errorMessage", null);
            let activityCode = this.get("model.membership.ActivityCode");
            let sessionCode = this.get("model.membership.SessionCode");
            this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
        }
    }
});
