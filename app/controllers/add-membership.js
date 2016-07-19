import Ember from "ember";
import getSync from "test-app/utils/get-sync";
import postSync from "test-app/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    role: null,
    errorMessage: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        post(role) {
            // Variable declaration
            let comments = this.get("comments");
            let roleID = this.get("role.ParticipationCode");
            let student = null;
            let studentID = null;
            let data = {};
            let url = null;

            // If the person is a leader for the activity
            if (this.get("model.leading")) {
                // Get the student to be added by email lookup
                let response = getSync("/students/email/" + this.get("studentEmail") + "/", this);
                let student = response.data;
                if (!response.succcess) {
                    this.set("errorMessage", "Please enter a valid student email");
                }

                /* Old way of calling without util function */

                // let success = true;
                // this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                //     Ember.$.ajax({
                //         type: "GET",
                //         url: "https://gordon360api.gordon.edu/api/students/email/" + this.get("studentEmail") + "/",
                //         async: false,
                //         headers: {
                //             "Authorization": headerValue
                //         },
                //         success: function(data) {
                //             student = data;
                //         },
                //         error: function() {
                //             success = false;
                //         }
                //     });
                // });
                // if (!success) {
                //     this.set("errorMessage", "Please enter a valid student email");
                // }

                /* End old way */

                // Set the new membership's student ID to the one retreived from api call
                studentID = student.StudentID;

                // Data to be sent in POST
                data = {
                    "ACT_CDE": this.get("model.activityCode"),
                    "SESSION_CDE": this.get("model.sessionCode"),
                    "ID_NUM": studentID,
                    "PART_LVL": roleID,
                    "BEGIN_DTE": new Date().toLocaleString(),
                    "END_DTE": new Date().toLocaleString(),
                    "DESCRIPTION": comments
                };
                // the new URL extension
                url = "/memberships";
            }
            // If the person is not a leader for the activity
            else {
                // Data to be sent in POST
                data = {
                    "ACT_CDE": this.get("model.activityCode"),
                    "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                    "PART_LVL": roleID,
                    "DATE_SENT": new Date(),
                    "SESS_CDE": this.get("model.sessionCode"),
                    "APPROVED": "Pending"
                };
                // the new URL extension
                url = "/requests";
            }

            // Data returned back from API call
            let response = postSync(url, data, this);

            // If the call was successfull transition back to the activity
            // Else set the proper error message
            if (response.success) {
                let activityCode = this.get("model.activityCode");
                let sessionCode = this.get("model.sessionCode");
                this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            }
            else {
                this.set("errorMessage", "Please enter a participation level");
            }

            /* Begin old way */

            // let success = true;
            // this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            //     Ember.$.ajax({
            //         type: "POST",
            //         url: url,
            //         data: JSON.stringify(data),
            //         contentType: "application/json",
            //         async: false,
            //         headers: {
            //             "Authorization": headerValue
            //         },
            //         error: function() {
            //             success = false;
            //         }
            //     });
            // });
            //
            // if (success) {
            //     let activityCode = this.get("model.activityCode");
            //     let sessionCode = this.get("model.sessionCode");
            //     this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            // }
            // else {
            //     this.set("errorMessage", "Please enter a participation level");
            // }

            /* end old way */
        }
    }
});
