import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),

    actions: {
        // Method that gets called when the follow button is clicked
        toggleFollow() {
            var passed = false;
            if (this.get("model").following) {
                var membershipID = this.get("model").membershipID;
                this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                    Ember.$.ajax({
                        type: "DELETE",
                        url: "https://gordon360api.gordon.edu/api/memberships/" + membershipID,
                        contentType: "application/json",
                        async: false,
                        headers: {
        					"Authorization": headerValue
        				},
                        success: function(data) {
                            passed = true;
                        }
                    });
                });
            }
            else {
                var membership = {
                    "ACT_CDE": this.get("model").activity.ActivityCode,
                    "SESSION_CDE": this.get("model").session.SessionCode.trim(),
                    "ID_NUM": this.get("session.data.authenticated.token_data.id"),
                    "PART_LVL": "GUEST",
                    "BEGIN_DTE": "1/1/2016",
                    "END_DTE": "2/2/2016",
                    "DESCRIPTION": "Basic Follower"
                };
                var newMembershipID = null;
                this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
                    Ember.$.ajax({
                        type: "POST",
                        url: "https://gordon360api.gordon.edu/api/memberships",
                        data: JSON.stringify(membership),
                        contentType: "application/json",
                        async: false,
                        headers: {
        					"Authorization": headerValue
        				},
                        success: function(data) {
                            newMembershipID = data.MEMBERSHIP_ID;
                            passed = true;
                        }
                    });
                });
                if (passed) {
                    this.set("model.membershipID", newMembershipID);
                }
            }
            if (passed) {
                this.set("model.following", !this.get("model").following);
            }
        },
        // Method that gets called when the Remove button is clicked
        removePerson() {
            if(confirm("Do you want to remove this person?")) {
                alert("Deleted");
                console.log("deleted person");
            } else {
                alert("not deleted");
                console.log("did not delete person");
            }
        },
        // Method that gets called when the Edit button is clicked
        editPerson() {
            alert("Edit");
            console.log("Edit Person");
        }
    }
});
