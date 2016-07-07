import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {

        // Method that gets called when the follow button is clicked
        toggleFollow() {
            var passed = false;
            if (this.get('model').following) {
                var membershipID = this.get('model').membershipID;
                Ember.$.ajax({
                    type: "DELETE",
                    url: "http://ccttrain.gordon.edu/api/memberships/" + membershipID,
                    contentType: "application/json",
                    async: false,
                    success: function(data) {
                        console.log(data);
                        passed = true;
                    },
                    error: function(errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
            else {
                var membership = {
                    "ACT_CDE": this.get('model').activity.ActivityCode,
                    "SESSION_CDE": this.get('model').session.SessionCode.trim(),
                    // Dalton ID
                    "ID_NUM": "50100155",
                    "PART_LVL": "GUEST",
                    "BEGIN_DTE": "1/1/2016",
                    "END_DTE": "2/2/2016",
                    "DESCRIPTION": "Basic Follower"
                };
                console.log(membership);
                var newMembershipID = null;
                Ember.$.ajax({
                    type: "POST",
                    url: "http://ccttrain.gordon.edu/api/memberships",
                    data: JSON.stringify(membership),
                    contentType: "application/json",
                    async: false,
                    success: function(data) {
                        newMembershipID = data.MEMBERSHIP_ID;
                        passed = true;
                    },
                    error: function(errorThrown) {
                        console.log(errorThrown);
                    }
                });
                if (passed) {
                    this.set('model.membershipID', newMembershipID);
                }
            }
            if (passed) {
                console.log(this.get("model"));
                this.set('model.following', !this.get('model').following);
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
