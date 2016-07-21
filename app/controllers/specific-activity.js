import Ember from "ember";
import deleteSync from "gordon360/utils/delete-sync";
import postSync from "gordon360/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        // Method that gets called when the follow button is clicked
        toggleFollow() {
            let passed = false;
            if (this.get("model").following) {
                let membershipID = this.get("model").membershipID;
                // API call via util function to delete a (GUEST) membership
                passed = deleteSync("/memberships/" + membershipID, this).success;
            }
            else {
                // Data to be sent with API call
                let membership = {
                    "ACT_CDE": this.get("model").activity.ActivityCode,
                    "SESS_CDE": this.get("model").session.SessionCode.trim(),
                    "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                    "PART_CDE": "GUEST",
                    "BEGIN_DTE": new Date().toLocaleDateString(),
                    "END_DTE": new Date().toLocaleDateString(),
                    "COMMENT_TXT": "Basic Follower"
                };
                console.log(membership);
                let newMembershipID = null;
                // API call via util function to add a new (GUEST) membership
                let response = postSync("/memberships", membership, this);
                if (response.success) {
                    this.set("model.membershipID", response.data.MEMBERSHIP_ID);
                    passed = true;
                }
                if (passed) {
                    this.set("model.membershipID", newMembershipID);
                }
            }
            if (passed) {
                this.set("model.following", !this.get("model").following);
                window.location.reload(true);
            }
        },
        // Method that gets called when the Remove button is clicked
        removePerson(membership) {
            console.log(membership);
            // Variable declaration
            let first = membership.FirstName;
            let last = membership.LastName;
            let role = membership.ParticipationDescription;
            let sessionCode = membership.SessionCode;
            let activityCode = membership.ActivityCode;

            if (confirm("Are you sure you want to remove (" + role + ") " + first + " " + last + " from this activity?")) {
                // API call via util function to remove a membership
                if (deleteSync("/memberships/" + membership.MembershipID, this).success) {
                    window.location.reload(true);
                }
            }
        },
        // Approve specified membership request
        approveRequest(request) {
            if (confirm("Accept this request?")) {
                // API call via util function to approve a pending membership request
                let response = postSync("/requests/" + request.RequestID + "/approve", request, this);
                if (response.success) {
                    window.location.reload(true);
                }
            }
        },
        // Deny specified membership request
        denyRequest(request) {
            if (confirm("Deny this request?")) {
                // API call via util function to deny a pending membership request
                let response = postSync("/requests/" + request.RequestID + "/deny", request, this);
                if (response.success) {
                    window.location.reload(true);
                }
            }
        },
        // Remove a supervisor from this activity
        removeSupervisor(supervisor) {
            // Variable declaration
            let firstname = supervisor.FirstName;
            let lastname = supervisor.LastName;
            let id = supervisor.SupervisorID;

            if(confirm("Do you want to remove " + firstname + " " + lastname + " as a supervisor?")) {
                // API call to delete specified supervisor
                let response = deleteSync("/supervisors/" + id, this);
                if (response.success) {
                    window.location.reload(true);
                }
            }
        }
    }
});
