import Ember from "ember";
import getSync from "gordon360/utils/get-sync";
import postSync from "gordon360/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    role: null,
    errorMessage: null,
    /* All the actions that can be called from interaction with add-membership.hbs */
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
                let email = this.get("studentEmail");
                if (email.indexOf("@gordon.edu") === -1) {
                    email = email + "@gordon.edu";
                }
                let response = getSync("/students/email/" + email + "/", this);
                let student = response.data;
                if (!response.succcess) {
                    this.set("errorMessage", "Please enter a valid student email");
                }
                // Set the new membership's student ID to the one retreived from api call
                studentID = student.StudentID;
                // Data to be sent in POST
                data = {
                    "ACT_CDE": this.get("model.activity.ActivityCode"),
                    "SESS_CDE": this.get("model.sessionCode"),
                    "ID_NUM": studentID,
                    "PART_CDE": roleID,
                    "BEGIN_DTE": new Date().toLocaleString(),
                    "END_DTE": new Date().toLocaleString(),
                    "COMMENT_TXT": comments
                };
                // the new URL extension
                url = "/memberships";
            }
            // If the person is not a leader for the activity
            else {
                // Data to be sent in POST
                data = {
                    "ACT_CDE": this.get("model.activity.ActivityCode"),
                    "SESS_CDE": this.get("model.sessionCode"),
                    "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                    "PART_CDE": roleID,
                    "DATE_SENT": new Date().toLocaleString(),
                    "COMMENT_TXT": comments,
                    "APPROVED": "Pending"
                    //
                    // "ACT_CDE": this.get("model.activityCode"),
                    // "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                    // "PART_CDE": roleID,
                    // "DATE_SENT": new Date(),
                    // "SESS_CDE": this.get("model.sessionCode"),
                    // "APPROVED": "Pending"
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
                this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                    "/" + this.get("model.activity.ActivityCode"));
            }
            else {
                this.set("errorMessage", "Please enter a participation level");
            }
        }
    }
});
