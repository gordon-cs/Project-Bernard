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
            this.set("errorMessage", null);
            let data = {};
            let url = null;
            if (this.get("role.ParticipationCode") == null) {
                this.set("errorMessage", "Please enter a participation level");
            }
            else {
                // If the person is a leader for the activity
                if (this.get("model.leading")) {
                    // Get the student to be added by email lookup
                    let email = this.get("studentEmail");
                    if (email == null) {
                        this.set("errorMessage", "Please enter a student email");
                    }
                    else {
                        console.log("leader else");
                        if (email.indexOf("@gordon.edu") === -1) {
                            email = email + "@gordon.edu";
                        }
                        let response = getSync("/accounts/email/" + email + "/", this);
                        let student = response.data;
                        if (!response.success) {
                            this.set("errorMessage", "Please enter a valid student email");
                        }
                        // Data to be sent in POST
                        data = {
                            "ACT_CDE": this.get("model.activity.ActivityCode"),
                            "SESS_CDE": this.get("model.sessionCode"),
                            "ID_NUM": student.StudentID,
                            "PART_CDE": this.get("role.ParticipationCode"),
                            "BEGIN_DTE": new Date().toLocaleString(),
                            "END_DTE": new Date().toLocaleString(),
                            "COMMENT_TXT": this.get("comments")
                        };
                        console.log(data);
                        // the new URL extension
                        url = "/memberships";
                    }
                }
                // If the person is not a leader for the activity
                else {
                    // Data to be sent in POST
                    data = {
                        "ACT_CDE": this.get("model.activity.ActivityCode"),
                        "SESS_CDE": this.get("model.sessionCode"),
                        "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                        "PART_CDE": this.get("role.ParticipationCode"),
                        "DATE_SENT": new Date().toLocaleString(),
                        "COMMENT_TXT": this.get("comments"),
                        "APPROVED": "Pending"
                    };
                    // the new URL extension
                    url = "/requests";
                }
                let memberships = this.get("model.memberships")
                for (let i = 0; i < memberships.length; i ++) {
                    if (memberships[i].IDNumber == data.ID_NUM && memberships[i].Participation == data.PART_CDE) {
                        this.set("errorMessage", "Already added as a " + this.role.ParticipationDescription);
                    }
                }
                if (this.get("errorMessage") === null) {
                    // Data returned back from API call
                    let response = postSync(url, data, this);
                    // If the call was successfull transition back to the activity
                    // Else set the proper error message
                    if (response.success) {
                        this.transitionToRoute("/specific-activity/" + this.get("model.sessionCode") +
                            "/" + this.get("model.activity.ActivityCode"));
                    }
                    else {
                        this.set("errorMessage", "An error has occured");
                    }
                }
            }
        }
    }
});
