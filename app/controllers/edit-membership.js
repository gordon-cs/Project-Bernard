import Ember from "ember";
import putAsync from "gordon360/utils/put-async";

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
            if (comments == null || comments == "") {
                passed = false;
                comments = this.get("model.membership.Description");
            }
            let roleID = this.get("role.ParticipationCode");
            if (roleID == null) {
                roleID = this.get("model.membership.Participation");
            }
            // Check for input errors
            let errorChecks = function() {
                let passed = true;
                if (comments.length > 45) {
                    passed = false;
                    context.set("errorMessage", "Comment is too long. Max length 45 characters");
                }
                return passed;
            }
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

                return putAsync("/memberships/" + membershipID, data, context);
            }
            // Transition back to activity
            let transition = function() {
                let activityCode = context.get("model.membership.ActivityCode");
                let sessionCode = context.get("model.membership.SessionCode");
                context.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            }

            if (errorChecks()) {
                updateMembership()
                .then(transition);
            }
        }
    }
});
