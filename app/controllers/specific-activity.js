import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        // Method that gets called when the follow button is clicked
        toggleFollow() {
            var passed = false;
            if (this.get('model').following) {
                var membershipID = this.get('model').membershipID;
                this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                    Ember.$.ajax({
                        type: "DELETE",
                        url: "http://gordon360api.gordon.edu/api/memberships/" + membershipID,
                        contentType: "application/json",
                        async: false,
                        headers: {
        					"Authorization": headerValue
        				},
                        success: function(data) {
                            passed = true;
                        }
                    });
                });
            }
            else {
                var membership = {
                    "ACT_CDE": this.get('model').activity.ActivityCode,
                    "SESSION_CDE": this.get('model').session.SessionCode.trim(),
                    "ID_NUM": this.get('session.data.authenticated.token_data.id'),
                    "PART_LVL": "GUEST",
                    "BEGIN_DTE": "1/1/2016",
                    "END_DTE": "2/2/2016",
                    "DESCRIPTION": "Basic Follower"
                };
                var newMembershipID = null;
                this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                    Ember.$.ajax({
                        type: "POST",
                        url: "http://gordon360api.gordon.edu/api/memberships",
                        data: JSON.stringify(membership),
                        contentType: "application/json",
                        async: false,
                        headers: {
        					"Authorization": headerValue
        				},
                        success: function(data) {
                            newMembershipID = data.MEMBERSHIP_ID;
                            passed = true;
                        }
                    });
                });
                if (passed) {
                    this.set('model.membershipID', newMembershipID);
                }
            }
            if (passed) {
                this.set('model.following', !this.get('model').following);
            }
        },

        // Method that gets called when the Remove button is clicked
        removePerson(membership) {

            // Variable declaration
            var passed = false;
            var first = membership.FirstName;
            var last = membership.LastName;
            var memId = membership.MembershipID;
            var sessionCode = membership.SessionCode;
            var activityCode = membership.ActivityCode;

            console.log(membership);

            if(confirm("Do you want to remove " + first + " " + last + " from this activity?")) {
                Ember.$.ajax({
                    type: "DELETE",
                    url: "http://gordon360api.gordon.edu/api/memberships/" + memId,
                    data: JSON.stringify(membership),
                    contentType: "application/json",
                    async: false,
                    success: function(data) {
                        passed = true;
                    },
                    error: function(errorThrown) {
                      console.log(errorThrown);
                    }
                });

                // Remove row from roster table
                if (passed) {
                  alert(first + " " + last + " removed.");
                  console.log("deleted person");
                }
                // Do nothing
                else {
                  alert(first + " " + last + " not removed.");
                  console.log("did not delete person");
                }
            }
        }
    }
});
