import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        var model = {
            "following": false,
            "leading": false,
            "adminPriv": false,
            "membershipID": null,
            "leaders": [],
            "activity": null,
            "session": null,
            "memberships": [],
            "advisors": [],
            "allMyMembershipIDs": []
        };
        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            // Determine if the person logged in has god mode capabilities
            if(this.get('session.data.authenticated.token_data.college_role') === "god") {
                model.adminPriv = true;
                //ERROR CHECK - Should not show when deployed... console.log("Admin! -- " + this.get('session.data.authenticated.token_data.college_role'));
            };

            // Set the logged in user to be leader if they have admin priviledges
            if (model.adminPriv) {
                //ERROR CHECK - Should not show when deployed... console.log("Admin! part.2");
                model.leading = true;
            };

            //ERROR CHECK - Should not show when deployed... console.log(this.get('session.data.authenticated'));
            var IDNumber = this.get('session.data.authenticated.token_data.id');
            // Set Activity Info
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/activities/' + param.ActivityCode,
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    model.activity = data;
                }
            });
            // Set Session Info
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/sessions/' + param.SessionCode,
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    model.session = data;
                }
            });
            // Set Leading and Leaders
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/memberships/activity/' + param.ActivityCode + "/leaders",
                async: false,
                headers: {
					"Authorization": headerValue
				},
                success: function(data) {
                    model.leaders = [];
                    for (var i = 0; i < data.length; i ++) {
                        if (data[i].SessionCode === param.SessionCode) {
                            model.leaders.push(data[i]);
                            if (data[i].IDNumber === IDNumber) {
                                model.leading = true;
                            }
                        }
                    }
                }
            });
            // Set Activity Memberships and Membership Info
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/memberships/activity/' + param.ActivityCode,
                async: false,
                headers: {
					          "Authorization": headerValue
				},
                success: function(data) {
                    model.memberships = [];
                    for (var i = 0; i < data.length; i ++) {
                        if (data[i].SessionCode === param.SessionCode) {
                            model.memberships.push(data[i]);
                            if (data[i].IDNumber === IDNumber) {
                                model.allMyMembershipIDs.push(data[i].MembershipID);
                                if (data[i].Participation === "GUEST") {
                                    model.membershipID = data[i].MembershipID;
                                    model.following = true;
                                }
                            }
                        }
                    }
                }
            });
            // Get a list of all roles that can be assigned
            Ember.$.ajax({
                type: "GET",
                url: 'https://gordon360api.gordon.edu/api/participations',
                async: false,
                headers: {
                    "Authorization": headerValue
                },
                success: function(data) {
                  model.roles = [];
                  for (var i = 0; i < data.length; i ++) {
                      model.roles.push(data[i]);
                  }
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            });
        });
        return model;
    }
});
