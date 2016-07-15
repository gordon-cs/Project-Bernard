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
            var studentID = null;
            if (this.get("model.leading")) {
                studentID = this.get("studentID");
            }
            var success = false;
            this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                // Get the student to be added by email lookup
                Ember.$.ajax({
                    type: "GET",
                    url: "https://gordon360api.gordon.edu/api/students/email/" + this.get("studentEmail") + "/",
                    async: false,
                    headers: {
                        "Authorization": headerValue
                    },
                    success: function(data) {
                        student = data;
                    },
                    error: function(errorThrown) {
                        console.log(errorThrown);
                        alert("Please enter a valid student Email.")
                    }
                });
                // Set the new membership's student ID to the one retreived from api call
                studentID = student.StudentID;
                // Data to be sent in POST request
                var data = {
                    "ACT_CDE": this.get("model.activityCode"),
                    "SESSION_CDE": this.get("model.sessionCode"),
                    "ID_NUM": studentID,
                    "PART_LVL": roleID,
                    "BEGIN_DTE": new Date().toLocaleDateString(),
                    "END_DTE": new Date().toLocaleDateString(),
                    "DESCRIPTION": comments
                };
                // Add the new membership
                Ember.$.ajax({
                    type: "POST",
                    url: "https://gordon360api.gordon.edu/api/memberships",
                    data: JSON.stringify(data),
                    contentType: "application/json",
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
