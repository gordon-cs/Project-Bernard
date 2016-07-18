import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    role: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        post(role) {
            var comments = this.get("comments");
            var roleID = this.get("role.ParticipationCode");
            var student = null;
            var studentID = null;
            var success = false;
            var data = {};
            var url = null;
            var success = false;
            this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {

                if (this.get("model.leading")) {
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
                            alert("Please enter a valid student email.")
                        }
                    });

                    // Set the new membership's student ID to the one retreived from api call
                    studentID = student.StudentID;

                    data = {
                        "ACT_CDE": this.get("model.activityCode"),
                        "SESSION_CDE": this.get("model.sessionCode"),
                        "ID_NUM": studentID,
                        "PART_LVL": roleID,
                        "BEGIN_DTE": new Date(),
                        "END_DTE": new Date(),
                        "DESCRIPTION": comments
                    };
                    url = "https://gordon360api.gordon.edu/api/memberships";
                }
                else {
                    data = {
                        "ACT_CDE": this.get("model.activityCode"),
                        "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                        "PART_LVL": roleID,
                        "DATE_SENT": new Date(),
                        "SESS_CDE": this.get("model.sessionCode"),
                        "APPROVED": "Pending"
                    };
                    url = "https://gordon360api.gordon.edu/api/requests";
                }
                console.log(this.get("model"));
                console.log(data);

                Ember.$.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    async: false,
                    headers: {
                        "Authorization": headerValue
                    },
                    success: function(data) {
                        success = true;
                    },
                    error: function(errorThrown) {
                        console.log(errorThrown);
                        alert("Make sure the student email is valid and select a participation level.");
                    }
                });

                if (success) {
                    var activityCode = this.get("model.activityCode");
                    var sessionCode = this.get("model.sessionCode");
                    this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
                }
            });

        }
    }
});
