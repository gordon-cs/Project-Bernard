import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        var model = {
            "activityCode": param.ActivityCode,
            "activity": null,
            "sessionCode": param.SessionCode,
            "roles": [],
            "student": null,
            "leading": false,
            "id": this.get("session.data.authenticated.token_data.id")
        };
        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            // Get all participations
            Ember.$.ajax({
                type: "GET",
                url: "https://gordon360api.gordon.edu/api/participations",
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
            Ember.$.ajax({
                type: "GET",
                url: "https://gordon360api.gordon.edu/api/memberships/activity/" + param.ActivityCode + "/leaders",
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    for (var i = 0; i < data.length; i ++) {
                        if (data[i].SessionCode === param.SessionCode &&
                            data[i].IDNumber === model.id)
                        {
                            model.leading = true;
                        }
                    }
                }
            });
        });
        console.log(model);
        return model;
    }
});
