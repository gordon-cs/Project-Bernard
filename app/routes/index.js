import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	activate() {
		this.controllerFor("application").getRequests();
	},
	model() {
		// Get current session
		let currentSession = getSync("/sessions/current", this).data;
		// Get memberships of user
		let memberships = getSync("/memberships/student/" + this.get("session.data.authenticated.token_data.id"), this).data;
		// Sort memberships according to session
		let currentMemberships = [];
		let pastMemberships = [];
		for (let i = 0; i < memberships.length; i ++) {
			if (memberships[i].SessionCode === currentSession.SessionCode) {
				currentMemberships.push(memberships[i]);
			}
			else {
				let session = memberships[i].SessionDescription;
				let place = null;
				let length = pastMemberships.length;
				for (let j = 0; j < pastMemberships.length; j ++) {
					if (pastMemberships[j].session === session) {
						place = j;
					}
				}
				if (place === null) {
					pastMemberships.push({
						"session": session,
						"activities": []
					});
					place = length ++;
				}
				pastMemberships[place].activities.push(memberships[i]);
			}
		}
		// Check if the user has any current or past activites
		let nothingToShow = false;
		if (pastMemberships.length === 0 && currentMemberships.length === 0) {
			nothingToShow = true;
		}
		// this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
		// 	Ember.$.ajax({
		// 		type: "GET",
		// 		url: "https://gordon360api.gordon.edu/api/memberships/student/" + this.get("session.data.authenticated.token_data.id"),
		// 		async: false,
		// 		headers: {
		// 			"Authorization": headerValue
		// 		},
		// 		success: function(data) {
		// 			for (let i = 0; i < data.length; i ++) {
		// 				if (data[i].SessionCode === currentSession.SessionCode) {
		// 					model.currentMemberships.push(data[i]);
		// 				}
		// 				else {
		// 					let session = data[i].SessionDescription;
		// 					let place = null;
		// 					let length = model.pastMemberships.length;
		// 					for (let j = 0; j < model.pastMemberships.length; j ++) {
		// 						if (model.pastMemberships[j].session === session) {
		// 							place = j;
		// 						}
		// 					}
		// 					if (place === null) {
		// 						model.pastMemberships.push({
		// 							"session": session,
		// 							"activities": []
		// 						});
		// 						place = length ++;
		// 					}
		// 					model.pastMemberships[place].activities.push(data[i]);
		// 				}
		// 			}
		// 			if (data.length === 0) {
		// 				model.nothingToShow = true;
		// 			}
		// 		}
		// 	});
		// });
		return {
            "currentSession": currentSession,
			"currentMemberships": currentMemberships,
			"pastMemberships":	pastMemberships,
			"nothingToShow": nothingToShow
		};
	}
});
