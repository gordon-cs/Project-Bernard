import Ember from 'ember';

export default Ember.Route.extend({
    model(param) {
        var model = {
            "membershipID": param.MembershipID,
            "roles": null,
            "membership": null
        };

        // Get all roles from DB
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/KJzKJ6FOKx/api/participations',
            async: false,
            success: function(data) {
                model.roles = data;
            }
        });

        // Get membership item
        Ember.$.ajax({
            type: "GET",
            url: 'http://ccttrain.gordon.edu/KJzKJ6FOKx/api/memberships/' + param.MembershipID,
            async: false,
            success: function(data) {
                model.membership = data;
            }
        })

        return model;
    }
});
