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
            alert(comments);
            var data = {
                "ACT_CDE": this.get("model.activityCode"),
                "SESSION_CDE": this.get("model.sessionCode"),
                "ID_NUM": "50154997",
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
                    alert("success");
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    }
});
