import Ember from "ember";

export default Ember.Route.extend({
    model() {
        var model = {
            "activities": null,
            "sessions": null,
            "currentSession": null
        };
        Ember.$.ajax({
            type: "GET",
            url: "http://ccttrain.gordon.edu/api/sessions",
            async: false,
            success: function(data) {
                model.sessions = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        Ember.$.ajax({
            type: "GET",
            url: "http://ccttrain.gordon.edu/api/sessions/current",
            async: false,
            success: function(data) {
                model.currentSession = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        Ember.$.ajax({
            type: "GET",
            url: "http://ccttrain.gordon.edu/api/sessions/" + model.currentSession.SessionCode + "/activities",
            async: false,
            success: function(data) {
                model.activities = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        console.log(model);
        return model;
    }
});
