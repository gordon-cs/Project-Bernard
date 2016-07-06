import Ember from 'ember';

export default Ember.Route.extend({
    model(param) {
        var model = {
            "activityCode": param.ActivityCode,
            "sessionCode": param.SessionCode,
            "roles": null,
            "leading": false
        };
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/api/participations',
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
