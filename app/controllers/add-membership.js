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
            let comments = this.get("comments") || "";

            /* If no participation was selected for the new membership - throw an error
             * If the comments exceed the length allowed by the database - throw an error
             * Else comments and participation are acceptable
             */
            if (this.get("role.ParticipationCode") == null) {
                this.set("errorMessage", "Please enter a participation level");
            }
            else if (comments.length > 45) {
                this.set("errorMessage", "Comment is too long: Max length 45 characters");
            }
            else {
                /* If the person is a leader for the activity
                 * Else the person is not a leader for the activity
                 */
                if (this.get("model.leading")) {
                    // Get the student to be added by email lookup
                    let email = this.get("studentEmail");

                    /* If the email field is left empty
                     * Else the email field is not left empty
                     */
                    if (email == null || email == "") {
                        this.set("errorMessage", "Please enter a student email");
                    }
                    else {
                        // If the entered email is missing the domain, add it in
                        if (email.indexOf("@gordon.edu") === -1) {
                            email = email + "@gordon.edu";
                        }
                        // API call to get the person by email
                        let response = getSync("/accounts/email/" + email + "/", this);
                        let student = response.data;

                        /* If the call to get a student was successfull
                         * Else send an errorMessage
                         */
                        if (response.success) {
                            // Data to be sent in POST
                            data = {
                                "ACT_CDE": this.get("model.activity.ActivityCode"),
                                "SESS_CDE": this.get("model.sessionCode"),
                                "ID_NUM": student.GordonID,
                                "PART_CDE": this.get("role.ParticipationCode"),
                                "BEGIN_DTE": new Date().toJSON(),
                                "END_DTE": new Date().toJSON(),
                                "COMMENT_TXT": comments
                            };
                            // the new URL extension
                            url = "/memberships";
                        }
                        else {
                            this.set("errorMessage", "Please enter a valid student email");
                        }
                    }
                }
                else {
                    // Data to be sent in POST
                    data = {
                        "ACT_CDE": this.get("model.activity.ActivityCode"),
                        "SESS_CDE": this.get("model.sessionCode"),
                        "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                        "PART_CDE": this.get("role.ParticipationCode"),
                        "DATE_SENT": new Date().toJSON(),
                        "COMMENT_TXT": this.get("comments"),
                        "APPROVED": "Pending"
                    };
                    // The new URL extension for the API call
                    url = "/requests";
                }
                // Gets all memberships for this activity
                let memberships = this.get("model.memberships")

                // Checks the memberships to see if they have already been added with that role in that activity
                for (let i = 0; i < memberships.length; i ++) {
                    if (memberships[i].IDNumber == data.ID_NUM && memberships[i].Participation == data.PART_CDE) {
                        this.set("errorMessage", "Already added as a " + this.role.ParticipationDescription);
                    }
                }
                // If no errors were returned thus far
                if (this.get("errorMessage") == null) {
                    // Data returned back from API call
                    let response = postSync(url, data, this);

                    /* If the call was successfull transition back to the activity
                     * Else set the proper error message
                     */
                    if (response.success) {
                        this.set("studentEmail", null);
                        this.set("role", null);
                        this.set("comments", null);
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
