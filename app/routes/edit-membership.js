import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        var model = {
            "membershipID": param.MembershipID,
            "roles": null,
            "membership": null
        };

        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
          // Get all roles from DB
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

          // Get membership item
          Ember.$.ajax({
              type: "GET",
              url: 'http://gordon360api.gordon.edu/api/memberships/' + param.MembershipID,
              async: false,
              headers: {
                "Authorization": headerValue
              },
              success: function(data) {
                  model.membership = data;
                  console.log(data);
              }
          });
        });

        return model;
    }
});
