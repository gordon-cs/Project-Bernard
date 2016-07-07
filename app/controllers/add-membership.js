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
            console.log(data);
            Ember.$.ajax({
                type: "POST",
                url: "http://ccttrain.gordon.edu/api/memberships/",
                data: data,
                dataType: "json",
                success: function(data) {
                    console.log(data);
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    }
});
