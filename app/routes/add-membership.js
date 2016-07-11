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
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/KJzKJ6FOKx/api/participations',
            async: false,
            success: function(data) {
                model.roles = data;
            }
        });
        if (param.Leading === "true") {
            model.leading = true;
        }
        return model;
    }
});
