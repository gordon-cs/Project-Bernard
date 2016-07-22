import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	activate() {
		this.controllerFor("application").getRequests();
	},
	model() {
		// Get current session
		let currentSession = getSync("/sessions/current", this).data;
		// Get memberships of user
		let memberships = getSync("/memberships/student/" + this.get("session.data.authenticated.token_data.id"), this).data;
		// Get supervisor data to show
		let allSupervisions = getSync("/supervisors/person/" + this.get("session.data.authenticated.token_data.id"), this).data;
		let currentSupervisions = [];
		// Loop through each supervision
		for (let i = 0; i < allSupervisions.length; i++) {
			allSupervisions[i].SessionCode = allSupervisions[i].SessionCode.trim();
			allSupervisions[i].ActivityCode = allSupervisions[i].ActivityCode.trim();

			// Set the current supervisorships
			if (allSupervisions[i].SessionCode === currentSession.SessionCode) {
				currentSupervisions.push(allSupervisions[i]);
			}
		}

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
		for (let i = 0; i < pastMemberships.length; i ++) {
			sortJsonArray(pastMemberships[i].activities, "ActivityDescription");
		}
		// Check if the user has any current or past activites
		let currentMembershipsFilled = (currentMemberships.length !== 0);
		let pastMembershipsFilled = (pastMemberships.length !== 0);
		let currentSupervisionsFilled = (currentSupervisions.length !== 0);
		let nothingToShow = !(currentMembershipsFilled || pastMembershipsFilled || currentSupervisionsFilled);
		// Error checks
		//console.log(currentMembershipsFilled);
		// console.log(pastMembershipsFilled);
		// console.log(currentSupervisionsFilled);
		// console.log(nothingToShow);
		//
		return {
            "currentSession": currentSession,
			"currentMemberships": sortJsonArray(currentMemberships, "ActivityDescription"),
			"pastMemberships":	pastMemberships,
			"currentMembershipsFilled": currentMembershipsFilled,
			"pastMembershipsFilled": pastMembershipsFilled,
			"currentSupervisionsFilled": currentSupervisionsFilled,
			"currentSupervisions": currentSupervisions,
			"nothingToShow": nothingToShow
		};
	}
});
