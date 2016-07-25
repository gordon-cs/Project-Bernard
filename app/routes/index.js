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
		let pastSupervisions = [];

		// Loop through each supervision
		for (let i = 0; i < allSupervisions.length; i++) {
			allSupervisions[i].SessionCode = allSupervisions[i].SessionCode.trim();
			allSupervisions[i].ActivityCode = allSupervisions[i].ActivityCode.trim();

			// Get the activity image
			allSupervisions[i].ActivityImage = getSync("/activities/" + allSupervisions[i].ActivityCode, this).data.ActivityImage;

			/* If the current session matches one of the supervision sessions - Set it as a current supervisorships
			 * Else - Set it as a past supervision
			 */
			if (allSupervisions[i].SessionCode === currentSession.SessionCode) {
				currentSupervisions.push(allSupervisions[i]);
			}
			else {
				pastSupervisions.push(allSupervisions[i]);
			}
		}

		// Sort memberships according to session
		let currentMemberships = [];
		let pastMemberships = [];

		// Loop through each membership
		for (let i = 0; i < memberships.length; i ++) {
			/* If the current session matches the membership session - Set it as a current membership
			 * Else - Set it as a past membership
			 */
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
		// Check if the user has any current or past activity memberships or supervisions
		let currentMembershipsFilled = (currentMemberships.length !== 0);
		let pastMembershipsFilled = (pastMemberships.length !== 0);
		let currentSupervisionsFilled = (currentSupervisions.length !== 0);
		let pastSupervisionsFilled = (pastSupervisions.length !== 0);

		// Variable if the user has no memberships or supervisions associated with them
		let nothingToShow = !(currentMembershipsFilled || pastMembershipsFilled || currentSupervisionsFilled || pastSupervisionsFilled);

		return {
            "currentSession": currentSession,
			"currentMemberships": sortJsonArray(currentMemberships, "ActivityDescription"),
			"pastMemberships":	pastMemberships,
			"currentMembershipsFilled": currentMembershipsFilled,
			"pastMembershipsFilled": pastMembershipsFilled,
			"currentSupervisionsFilled": currentSupervisionsFilled,
			"currentSupervisions": currentSupervisions,
			"pastSupervisionsFilled": pastSupervisionsFilled,
			"pastSupervisions": pastSupervisions,
			"nothingToShow": nothingToShow
		};
	}
});
