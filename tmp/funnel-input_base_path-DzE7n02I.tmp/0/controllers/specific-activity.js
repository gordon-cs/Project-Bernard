import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        toggleFollow() {
            var passed = false;
            if (this.get('model').following) {
                var activityCode = this.get('model').activity.ActivityCode.trim();
                var membershipID = this.get('model').membershipID;
                Ember.$.ajax({
                    type: "DELETE",
                    url: "https://ccttrain.gordon.edu/api/memberships/" + membershipID,
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
                    "ID_NUM": "50154997",
                    "PART_LVL": "GUEST",
                    "BEGIN_DTE": "1/1/2016",
                    "END_DTE": "2/2/2016",
                    "DESCRIPTION": "Basic Follower"
                };
                console.log(membership);
                var newMembershipID = null;
                Ember.$.ajax({
                    type: "POST",
                    url: "https://ccttrain.gordon.edu/api/memberships",
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
        }
    }
});
