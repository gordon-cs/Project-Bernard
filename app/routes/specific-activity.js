import Ember from 'ember';

export default Ember.Route.extend({

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        var model = {
            "following": false,
            "leading": false,
            "membershipID": null,
            "leaders": null,
            "activity": null,
            "session": null,
            "memberships": null,
            "advisors": null,
            "allMyMembershipIDs": []
        };

        // Set Activity Info
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/activities/' + param.ActivityCode,
            async: false,
            success: function(data) {
                model.activity = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });

        // Set Session Info
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/sessions/' + param.SessionCode,
            async: false,
            success: function(data) {
                model.session = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        
        // Set Leading and Leaders
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/activities/' + param.ActivityCode + "/leaders",
            async: false,
            success: function(data) {
                model.leaders = [];
                for (var i = 0; i < data.length; i ++) {
                    if (data[i].SessionCode === param.SessionCode) {
                        model.leaders.push(data[i]);
                        if (data[i].IDNumber === "50154997") {
                            model.leading = true;
                        }
                    }
                }
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        
        // Set Activity Memberships and Membership Info
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/activities/' + param.ActivityCode + "/memberships",
            async: false,
            success: function(data) {
                model.memberships = [];
                for (var i = 0; i < data.length; i ++) {
                    if (data[i].SessionCode === param.SessionCode) {
                        model.memberships.push(data[i]);
                        if (data[i].IDNumber === "50154997") {
                            model.allMyMembershipIDs.push(data[i].MembershipID);
                            if (data[i].Participation === "GUEST") {
                                model.membershipID = data[i].MembershipID;
                                model.following = true;
                            }
                        }
                    }
                }
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        return model;
    }
});
