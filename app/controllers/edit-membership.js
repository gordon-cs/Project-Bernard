import Ember from "ember";
import putSync from "gordon360/utils/put-sync";

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
            let comments = this.get("comments") || "";

            /* If the comments entered into the field are too long - throw an error
             * Else - continue on with API call
             */
            if (comments.length > 45) {
                this.set("errorMessage", "Comment is too long. Max length 45 characters");
            }
            else {
                // If no comments were entered use any old ones available
                if (comments == null || comments == "") {
                    comments = this.get("model.membership.Description");
                }

                let roleID = this.get("role.ParticipationCode");
                // If no role was selected use the role currently held by the person being edited
                if (roleID == null) {
                    roleID = this.get("model.membership.Participation");
                }

                let membershipID = this.get("model.membership.MembershipID");
                let studentID = this.get("model.membership.IDNumber");
                // Data to be sent in API call
                let data = {
                    "MEMBERSHIP_ID": membershipID,
                    "ACT_CDE": this.get("model.membership.ActivityCode"),
                    "SESS_CDE": this.get("model.membership.SessionCode"),
                    "ID_NUM": studentID,
                    "PART_CDE": roleID,
                    "BEGIN_DTE": new Date().toJSON(),
                    "END_DTE": new Date().toJSON(),
                    "COMMENT_TXT": comments
                };
                // API call to update a membership
                let response = putSync("/memberships/" + membershipID, data, this);
                /* If the API call was successful - transition back to previous pageUrl
                 * Else - throw an error
                 */
                if (response.success) {
                    let activityCode = this.get("model.membership.ActivityCode");
                    let sessionCode = this.get("model.membership.SessionCode");
                    this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
                }
                else {
                    this.set("errorMessage", JSON.parse(response.data.responseText).error_description);
                }
            }
        }
    }
});
