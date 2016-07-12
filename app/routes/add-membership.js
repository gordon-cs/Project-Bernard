import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        var model = {
            "activityCode": param.ActivityCode,
            "sessionCode": param.SessionCode,
            "roles": [],
            "leading": false
        };
        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            Ember.$.ajax({
                type: "GET",
                url: 'http://gordon360api.gordon.edu/api/participations',
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    model.roles = data;
                }
            });
        });
        if (param.Leading === "true") {
            model.leading = true;
        }
        return model;
    }
});
