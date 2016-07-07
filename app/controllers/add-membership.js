import Ember from 'ember';

export default Ember.Controller.extend({
    role: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        post: function(role) {
            var comments = this.get("comments");
            var roleID = this.get("role.ParticipationCode");
            // Dalton ID Num
            var studentID = "50100155";
            if (this.get("model.leading")) {
                studentID = this.get("studentID");
            }
            var data = {
                "ACT_CDE": this.get("model.activityCode"),
                "SESSION_CDE": this.get("model.sessionCode"),
                "ID_NUM": studentID,
                "PART_LVL": roleID,
                "BEGIN_DTE": "1/1/2016",
                "DESCRIPTION": comments
            };
            var success = false;
            Ember.$.ajax({
                type: "POST",
                url: "http://ccttrain.gordon.edu/KJzKJ6FOKx/api/memberships/",
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
            if (success) {
                var activityCode = this.get("model.activityCode");
                var sessionCode = this.get("model.sessionCode");
                this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            }
        }
    }
});
