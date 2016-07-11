import Ember from "ember";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        var model = {
            "activities": [],
            "activitesShown": [],
            "sessions": [],
            "currentSession": null
        };
        // Get Sessions Data
        Ember.$.ajax({
            type: "GET",
            url: "http://ccttrain.gordon.edu/KJzKJ6FOKx/api/sessions",
            async: false,
            success: function(data) {
                for (var i = data.length - 1; i >= 0; i --) {
                    model.sessions.push(data[i]);
                }
                console.log(model.sessions);
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        // Get Current Session
        Ember.$.ajax({
            type: "GET",
            url: "http://ccttrain.gordon.edu/KJzKJ6FOKx/api/sessions/current",
            async: false,
            success: function(data) {
                model.currentSession = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        // Get Activities in Session
        Ember.$.ajax({
            type: "GET",
            url: "http://ccttrain.gordon.edu/KJzKJ6FOKx/api/sessions/" + model.currentSession.SessionCode + "/activities",
            async: false,
            success: function(data) {
                model.activities = data;
                model.activitiesShown = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        console.log(model);
        return model;
    }
});
