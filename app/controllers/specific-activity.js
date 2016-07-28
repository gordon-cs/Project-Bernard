import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";
import postAsync from "gordon360/utils/post-async";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    followLoad: false,
    actions: {
        // Method that gets called when the follow button is clicked
        toggleFollow() {
            let context = this;
            // Post a new membership with 'GUEST' participation
            let follow = function() {
                context.set("followLoad", true);
                let data = {
                    "ACT_CDE": context.model.activity.ActivityCode,
                    "SESS_CDE": context.model.session.SessionCode.trim(),
                    "ID_NUM": context.get("session.data.authenticated.token_data.id"),
                    "PART_CDE": "GUEST",
                    "BEGIN_DTE": new Date().toJSON(),
                    "END_DTE": new Date().toJSON(),
                    "COMMENT_TXT": "Basic Follower"
                };
                return postAsync("/memberships", data, context);
            };
            // Delete follow membership
            let unfollow = function() {
                context.set("followLoad", true);
                return deleteAsync("/memberships/" + context.model.membershipID, context);
            };
            // Get ID of new follow membership
            let getNewMembership = function(result) {
                return context.set("model.membershipID", result.MEMBERSHIP_ID);
            }
            // Switch 'following' in model
            let switchFollow = function() {
                context.set("model.following", !context.model.following);
                context.set("followLoad", false);
            }

            if (this.model.following) {
                unfollow()
                .then(switchFollow);
            }
            else {
                follow()
                .then(getNewMembership)
                .then(switchFollow);
            }
        },
        // Method that gets called when the Remove button is clicked
        removePerson(membership) {
            // Variable declaration
            let first = membership.FirstName;
            let last = membership.LastName;
            let role = membership.ParticipationDescription;
            if (confirm("Are you sure you want to remove (" + role + ") " + first + " " + last + " from this activity?")) {
                // API call via util function to remove a membership
                deleteAsync("/memberships/" + membership.MembershipID, this)
                .then(window.location.reload(true));
            }
        },
        // Approve specified membership request
        approveRequest(request) {
            if (confirm("Accept this request?")) {
                // API call via util function to approve a pending membership request
                postAsync("/requests/" + request.RequestID + "/approve", request, this)
                .then(window.location.reload(true));
            }
        },
        // Deny specified membership request
        denyRequest(request) {
            if (confirm("Deny this request?")) {
                // API call via util function to deny a pending membership request
                postAsync("/requests/" + request.RequestID + "/deny", request, this)
                .then(window.location.reload(true));
            }
        },
        // Remove a supervisor from this activity
        removeSupervisor(supervisor) {
            // Variable declaration
            let firstname = supervisor.FirstName;
            let lastname = supervisor.LastName;
            let id = supervisor.SupervisorID;

            if (confirm("Do you want to remove " + firstname + " " + lastname + " as a supervisor?")) {
                // API call to delete specified supervisor
                deleteAsync("/supervisors/" + id, this)
                .then(window.location.reload(true));
            }
        }
    }
});
