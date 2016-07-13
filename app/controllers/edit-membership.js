import Ember from 'ember';

export default Ember.Controller.extend({
    role: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        update: function() {
            var comments = this.get("comments");
            var membershipID = this.get("model.membership.MembershipID");
            var roleID = this.get("role.ParticipationCode");
            var studentID = this.get("memberships.IDNumber");
            var data = {
              "MembershipID": membershipID,
              "ACT_CDE": this.get("model.membership.ActivityCode"),
              "SESSION_CDE": this.get("model.sessionCode"),
              "ID_NUM": studentID,
              "PART_LVL": roleID,
              "BEGIN_DTE": "1/1/2016",
              "DESCRIPTION": comments
            };
            var success = false;
            Ember.$.ajax({
                type: "PUT",
                url: "http://ccttrain.gordon.edu/KJzKJ6FOKx/api/memberships/" + membershipID,
                data: data,
                dataType: "json",
                async: false,
                success: function(data) {
                    console.log(data);
                    success = true;
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            });
            if(success) {
                var activityCode = this.get("model.activityCode");
                var sessionCode = this.get("model.sessionCode");
                this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            }
        }
    }
});
