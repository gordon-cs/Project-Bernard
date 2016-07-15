import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    role: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        update: function() {
            var comments = this.get("comments");

            // The comments field is left empty
            if (typeof comments == "undefined") {
              // Keep the old comments
              comments = this.get("model.membership.Description");
            }

            var roleID = this.get("role.ParticipationCode");
            var membershipID = this.get("model.membershipID");
            var studentID = this.get("model.membership.IDNumber");
            var data = {
              "MEMBERSHIP_ID": membershipID,
              "ACT_CDE": this.get("model.membership.ActivityCode"),
              "SESSION_CDE": this.get("model.membership.SessionCode"),
              "ID_NUM": studentID,
              "PART_LVL": roleID,
              "BEGIN_DTE": new Date().toLocaleDateString(),
              "END_DTE": new Date().toLocaleDateString(),
              "DESCRIPTION": comments
            };
            var success = false;
            this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                Ember.$.ajax({
                    type: "PUT",
                    url: "https://gordon360api.gordon.edu/api/memberships/" + membershipID,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    async: false,
                    headers: {
                        "Authorization": headerValue
                    },
                    success: function(data) {
                        //console.log(data);
                        success = true;
                    },
                    error: function(errorThrown) {
                        console.log(errorThrown);
                    }
                });
            });
            if(success) {
                var activityCode = this.get("model.membership.ActivityCode");
                var sessionCode = this.get("model.membership.SessionCode");
                this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            }
        }
    }
});
