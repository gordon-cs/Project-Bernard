import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        var model = {
            "activityCode": param.ActivityCode,
            "activity": null,
            "sessionCode": param.SessionCode,
            "roles": [],
            "student": null,
            "leading": false
        };
        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            // Get all participations
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/participations',
                async: false,
                headers: {
					          "Authorization": headerValue
				        },
                success: function(data) {
                    model.roles = data;
                }
            });
            // Get the activity information
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/activities/' + model.activityCode,
                async: false,
                headers: {
                    "Authorization": headerValue
                },
                success: function(data) {
                    model.activity = data;
                }
            });
        });
        if (param.Leading === "true") {
            model.leading = true;
        }
        return model;
    }
});
