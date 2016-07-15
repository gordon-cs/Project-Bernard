import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	model() {
		var model = {
            "currentSession": null,
			"currentMemberships": [],
			"pastMemberships": []
		};
		this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
			var currentSession = null;
			Ember.$.ajax({
				type: "GET",
				url: "https://gordon360api.gordon.edu/api/sessions/current",
				async: false,
				headers: {
					"Authorization": headerValue
				},
				success: function(data) {
					currentSession = data;
                    model.currentSession = data;
				}
			});
			Ember.$.ajax({
				type: "GET",
				url: "https://gordon360api.gordon.edu/api/memberships/student/" + this.get('session.data.authenticated.token_data.id'),
				async: false,
				headers: {
					"Authorization": headerValue
				},
				success: function(data) {
					for (var i = 0; i < data.length; i ++) {
						if (data[i].SessionCode === currentSession.SessionCode) {
							model.currentMemberships.push(data[i]);
						}
						else {
							var session = data[i].SessionDescription;
							var place = null;
							var length = model.pastMemberships.length;
							for (var j = 0; j < model.pastMemberships.length; j ++) {
								if (model.pastMemberships[j].session === session) {
									place = j;
								}
							}
							if (place === null) {
								model.pastMemberships.push({
									"session": session,
									"activities": []
								});
								place = length ++;
							}
							model.pastMemberships[place].activities.push(data[i]);
						}
					}
				}
			});
		});
		return model;
	}
});
