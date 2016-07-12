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
        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            // Get Sessions Data
            Ember.$.ajax({
                type: "GET",
                url: "http://gordon360api.gordon.edu/api/sessions",
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    for (var i = data.length - 1; i >= 0; i --) {
                        model.sessions.push(data[i]);
                    }
                }
            });
            // Get Current Session
            Ember.$.ajax({
                type: "GET",
                url: "http://gordon360api.gordon.edu/api/sessions/current",
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    model.currentSession = data;
                }
            });
            // Get Activities in Session
            Ember.$.ajax({
                type: "GET",
                url: "http://gordon360api.gordon.edu/api/sessions/" + model.currentSession.SessionCode + "/activities",
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    model.activities = data;
                    model.activitiesShown = data;
                }
            });
        });
        return model;
    }
});
