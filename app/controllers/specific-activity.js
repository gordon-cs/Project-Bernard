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
                passed = deleteSync("memberships/" + membershipID, this).success;


                /* begin old way */
                // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                //     Ember.$.ajax({
                //         type: "DELETE",
                //         url: "https://gordon360api.gordon.edu/api/memberships/" + membershipID,
                //         contentType: "application/json",
                //         async: false,
                //         headers: {
        		// 			"Authorization": headerValue
        		// 		},
                //         success: function(data) {
                //             passed = true;
                //         }
                //     });
                // });
                /* end old way */
            }
            else {
                // Data to be sent with API call
                let membership = {
                    "ACT_CDE": this.get("model").activity.ActivityCode,
                    "SESSION_CDE": this.get("model").session.SessionCode.trim(),
                    "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                    "PART_LVL": "GUEST",
                    "BEGIN_DTE": new Date().toLocaleDateString(),
                    "END_DTE": new Date().toLocaleDateString(),
                    "DESCRIPTION": "Basic Follower"
                };
                let newMembershipID = null;

                // API call via util function to add a new (GUEST) membership
                let response = postSync("/memberships", membership, this);

                if (response.success) {
                    this.set("model.membershipID", response.data.MEMBERSHIP_ID);
                    passed = true;
                }

                /* begin old way */
                // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                //     Ember.$.ajax({
                //         type: "POST",
                //         url: "https://gordon360api.gordon.edu/api/memberships",
                //         data: JSON.stringify(membership),
                //         contentType: "application/json",
                //         async: false,
                //         headers: {
        		// 			"Authorization": headerValue
        		// 		},
                //         success: function(data) {
                //             newMembershipID = data.MEMBERSHIP_ID;
                //             passed = true;
                //         }
                //     });
                // });
                /* end old way */
                if (passed) {
                    this.set("model.membershipID", newMembershipID);
                }
            }
            if (passed) {
                this.set("model.following", !this.get("model").following);
            }
        },

        // Method that gets called when the Remove button is clicked
        removePerson(membership) {
            // Variable declaration
            let success = false;
            let first = membership.FirstName;
            let last = membership.LastName;
            let memId = membership.MembershipID;
            let role = membership.ParticipationDescription;
            let sessionCode = membership.SessionCode;
            let activityCode = membership.ActivityCode;

            if (confirm("Are you sure you want to remove (" + role + ") " + first + " " + last + " from this activity?")) {

                // API call via util function to remove a membership
                let response = deleteSync("/memberships/" + memId, membership, this);
                if (response.success) {
                    window.location.reload(true);
                }


                /* begin old way */
                // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                //     Ember.$.ajax({
                //         type: "DELETE",
                //         url: "https://gordon360api.gordon.edu/api/memberships/" + memId,
                //         data: JSON.stringify(membership),
                //         dataType: "json",
                //         headers: {
                //             "Authorization": headerValue
                //         },
                //         async: false,
                //         success: function(data) {
                //             success = true;
                //         }
                //     });
                // });
                //
                // if (success) {
                //     window.location.reload(true);
                // }
                /* end old way */
            }
        },

        // Approve specified membership request
        approveRequest(request) {
            if (confirm("Accept this request?")) {
                // API call via util function to approve a pending membership request
                let response = postSync("/requests/" + request.RequestID + "/approve");
                if (response.success) {
                    window.location.reload(true);
                }

                /* begin old way */
                // var success = false;
                // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                //     Ember.$.ajax({
                //         type: "POST",
                //         url: "https://gordon360api.gordon.edu/api/requests/" + request.RequestID + "/approve",
                //         contentType: "application/json",
                //         async: false,
                //         headers: {
        		// 			"Authorization": headerValue
        		// 		},
                //         success: function(data) {
                //             success = true;
                //         }
                //     });
                // });
                // if (success) {
                //     window.location.reload(true);
                // }
                /* end old way */
            }
        },

        // Deny specified membership request
        denyRequest(request) {
            if (confirm("Deny this request?")) {
                // API call via util function to deny a pending membership request
                let response = postSync("/requests/" + request.RequestID + "/deny");
                if (response.success) {
                    window.location.reload(true);
                }

                /* begin old way */
                // var success = false;
                // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                //     Ember.$.ajax({
                //         type: "POST",
                //         url: "https://gordon360api.gordon.edu/api/requests/" + request.RequestID + "/deny",
                //         contentType: "application/json",
                //         async: false,
                //         headers: {
                //             "Authorization": headerValue
                //         },
                //         success: function(data) {
                //             success = true;
                //         }
                //     });
                // });
                // if (success) {
                //     window.location.reload(true);
                // }
                /* end old way */
            }
        }
    }
});
