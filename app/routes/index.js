import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    activate() {
        this.controllerFor("application").getRequests();
    },
    model() {
        let id_number = this.get("session.data.authenticated.token_data.id");
        let context = this;

        // Supervisor-related variables
        let currentSupervisions = [];
        let pastSupervisions = [];

        // Membership-related variables
        let currentMemberships = [];
        let pastMemberships = [];

        // Switches
        let currentMembershipsFilled;
        let pastMembershipsFilled;
        let currentSupervisionsFilled;
        let pastSupervisionsFilled;
        let nothingToShow;

        let currentSession;
        let allSupervisions;
        let allMemberships;

        /* Promises */
        let loadCurrentSession = function( ) {
            return getAsync("/sessions/current", context)
        };

        let initializeCurrentSession = function ( result ) {
            currentSession = result;
        }

        let loadMemberships = function( ) {
            return getAsync("/memberships/student/" + id_number, context)
        };

        let initializeMemberships = function( result ) {
            allMemberships = result;
        };

        let arrangeMemberships = function ( ) {
            sortMemberships(currentSession,allMemberships,currentMemberships,pastMemberships);
            for (let i = 0; i < pastMemberships.length; i ++) {
                sortJsonArray(pastMemberships[i].activities, "ActivityDescription");
            }
        };

        let loadSupervisions = function( ) {
            return getAsync("/supervisors/person/" + id_number, context)
        };

        let initializeSupervisions = function ( result ) {
            allSupervisions = result;
        };

        let arrangeSupervisions = function ( ) {
            sortSupervisions(currentSession,allSupervisions,currentSupervisions,pastSupervisions);
        };

        let loadSwitches = function() {
            // Check if the user has any current or past activity memberships or supervisions
            currentMembershipsFilled = (currentMemberships.length !== 0);
            pastMembershipsFilled = (pastMemberships.length !== 0);
            currentSupervisionsFilled = (currentSupervisions.length !== 0);
            pastSupervisionsFilled = (pastSupervisions.length !== 0);

            // Variable if the user has no memberships or supervisions associated with them
            nothingToShow = !(currentMembershipsFilled ||
                pastMembershipsFilled ||
                currentSupervisionsFilled ||
                pastSupervisionsFilled);
        };

        let loadModel = function() {
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
        };
        /* End Promises */


        /* Compose the promises ♫♫♫♫♫♫ Music to my eyes*/
        return loadCurrentSession()
        .then( initializeCurrentSession )
        .then( loadSupervisions )
        .then( initializeSupervisions )
        .then( arrangeSupervisions )
        .then( loadMemberships )
        .then( initializeMemberships )
        .then( arrangeMemberships )
        .then( loadSwitches )
        .then( loadModel );

    }
});



/* Helper Functions */
// Arrange supervisions by session
function sortSupervisions(currentSession, allSupervisions, currentSupervisions, pastSupervisions) {
    // Loop through each supervision
    for (let i = 0; i < allSupervisions.length; i++) {
        allSupervisions[i].SessionCode = allSupervisions[i].SessionCode.trim();
        allSupervisions[i].ActivityCode = allSupervisions[i].ActivityCode.trim();

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
}

// Arrange memberships by session
function sortMemberships(currentSession, allMemberships, currentMemberships, pastMemberships) {
    // Loop through each membership

    for (let i = 0; i < allMemberships.length; i ++) {
        /* If the current session matches the membership session - Set it as a current membership
        * Else - Set it as a past membership
        */
        if (allMemberships[i].SessionCode === currentSession.SessionCode) {
            currentMemberships.push(allMemberships[i]);
        }
        else {
            let session = allMemberships[i].SessionDescription;
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
            pastMemberships[place].activities.push(allMemberships[i]);
        }
    }
}
