import Ember from 'ember';

export default Ember.Route.extend({

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        var model = {
            "following": false,
            "leader": false,
            "membershipID": null,
            "leaders": null,
            "activity": null,
            "session": null,
            "allMyMembershipIDs": []
        };
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
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/students/50154997/memberships',
            async: false,
            success: function(data) {
                for (var i = 0; i < data.length; i ++) {
                    model["allMyMembershipIDs"].push(data[i].MembershipID);
                    if (data[i].ActivityCode === param.ActivityCode &&
                        data[i].IDNumber === "50154997" &&
                        data[i].SessionCode === param.SessionCode.trim() &&
                        data[i].Participation === "GUEST"
                    ) {
                        model.membershipID = data[i].MembershipID;
                        model.following = true;
                    }
                }
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/activities/' + param.ActivityCode + "/leaders",
            async: false,
            success: function(data) {
                model.leaders = [];
                for (var i = 0; i < data.length; i ++) {
                    if (data[i].SessionCode === model.session.SessionCode) {
                        model.leaders.push(data[i]);
                        if (data[i].IDNumber === "50154997") {
                            model.leader = true;
                        }
                    }
                }
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/activities/' + param.ActivityCode + "/memberships",
            async: false,
            success: function(data) {
                model.memberships = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });

        console.log(model);
        return model;
    }
});
