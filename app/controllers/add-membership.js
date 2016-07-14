import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    role: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        post: function(role) {
            var comments = this.get("comments");
            var roleID = this.get("role.ParticipationCode");
            var student = null;
            var studentID = this.get('session.data.authenticated.token_data.id');
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
            this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                // Get a student by email
                Ember.$.ajax({
                    type: "GET",
                    url: "http://gordon360api.gordon.edu/api/students/email/" + this.get("studentEmail") + "/",
                    async: false,
                    headers: {
                        "Authorization": headerValue
                    },
                    success: function(data) {
                        student = data;
                    }
                });
                // Set the new membership's student ID to the one retreived from api call
                data.ID_NUM = student.StudentID;
                // Add the new membership
                Ember.$.ajax({
                    type: "POST",
                    url: "http://gordon360api.gordon.edu/api/memberships/",
                    data: data,
                    dataType: "json",
                    async: false,
                    headers: {
                        "Authorization": headerValue
                    },
                    success: function(data) {
                        success = true;
                    }
                });
            });
            if (success) {
                var activityCode = this.get("model.activityCode");
                var sessionCode = this.get("model.sessionCode");
                this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            }
        }
    }
});
