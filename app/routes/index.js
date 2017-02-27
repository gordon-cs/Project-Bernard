import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Route for the index (my involvements) page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    activate() {
        this.controllerFor("application").getRequests();
    },
    model() {
        let id_number = this.get("session.data.authenticated.token_data.id");
        let context = this;

        // advisor-related variables
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
        let allSupervisions = [];
        let allMemberships = [];

        /* Promises */
        let loadCurrentSession = function() {
            return getAsync("/sessions/current", context)
        };

        let initializeCurrentSession = function (result) {
            currentSession = result;
        }

        let loadMemberships = function() {
            return getAsync("/memberships/student/" + id_number, context)
        };

        let initializeMemberships = function(result) {
            for (let membership of result) {
                if (membership.Participation == "ADV") {
                    allSupervisions.push(membership);
                }
                else if (membership.Participation != "GUEST") {
                    allMemberships.push(membership);
                }
            }
        };

        let arrangeMemberships = function () {
            sortMemberships(currentSession,allMemberships,currentMemberships,pastMemberships);
            for (let i = 0; i < pastMemberships.length; i++) {
                sortJsonArray(pastMemberships[i].activities, "ActivityDescription");
            }
        };

        let arrangeSupervisions = function () {
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
        .then(initializeCurrentSession)
        .then(loadMemberships)
        .then(initializeMemberships)
        .then(arrangeMemberships)
        .then(arrangeSupervisions)
        .then(loadSwitches)
        .then(loadModel);

    }
});



/* Helper Functions */
// Arrange supervisions by session
function sortSupervisions(currentSession, allSupervisions, currentSupervisions, pastSupervisions) {
    // Loop through each supervision
    for (let i = 0; i < allSupervisions.length; i++) {
        allSupervisions[i].SessionCode = allSupervisions[i].SessionCode.trim();
        allSupervisions[i].ActivityCode = allSupervisions[i].ActivityCode.trim();

        /* If the current session matches one of the supervision sessions - Set it as a current advisorships
        * Else - Set it as a past supervision
        */
        if (allSupervisions[i].SessionCode === currentSession.SessionCode) {
            currentSupervisions.push(allSupervisions[i]);
        }
        else {
            // Arrange past supervisions in order by session code
            let placeFound = false;
            let j = 0;

            while (!placeFound && j < pastSupervisions.length) {

              //console.log("Past session already listed: " + pastSupervisions[j].SessionCode);
              if (allSupervisions[i].SessionCode >= pastSupervisions[j].SessionCode) {
                //console.log("Session code: " + allSupervisions[i].SessionCode + " is greater than past session" +
                 //pastSupervisions[j].SessionCode + " at index " + j );
                pastSupervisions.splice(j, 0, allSupervisions[i]);
                //console.log("Now at index " + j + ": " + pastSupervisions[j].SessionCode);
                //console.log("Now at index " +(j+1) + ": " + pastSupervisions[j+1].SessionCode)
                placeFound = true;
              }
              else {
                j++;
              }
            }
            if (!placeFound) {
            // If it wasn't greater than any sessions already in the list, add it to the end
            pastSupervisions.push(allSupervisions[i]);
          }
          //pastSupervisions.push(allSupervisions[i]);
        }
    }
}

// Arrange memberships by session
function sortMemberships(currentSession, allMemberships, currentMemberships, pastMemberships) {
    // Loop through each membership

    for (let i = 0; i < allMemberships.length; i++) {
        /* If the current session matches the membership session - Set it as a current membership
        * Else - Set it as a past membership
        */
        if (allMemberships[i].SessionCode === currentSession.SessionCode) {
            currentMemberships.push(allMemberships[i]);
        }
        else {

            // Sort past activities into groups by sessionCode, starting with most recent (i.e. greatest sessionCode)
            let session = allMemberships[i].SessionDescription;
            let sessionCode = allMemberships[i].SessionCode;
            let place = null;
            let j = 0;
            while (place === null && j < pastMemberships.length) {
              if (allMemberships[i].SessionCode > pastMemberships[j].sessionCode) {
                pastMemberships.splice(j, 0, {
                  "session": session,
                  "sessionCode": sessionCode,
                  "activities": []
                });
                place = j;
              }
              else if (allMemberships[i].SessionCode === pastMemberships[j].sessionCode) {
                pastMemberships[j].activities.push(allMemberships[j]);
                place = j;
              }
              else {
                j++;
              }
            }
            if (place === null) {
              pastMemberships.push({
                     "session": session,
                     "sessionCode": sessionCode,
                     "activities": []
                 });
              place = j++;
            }
            pastMemberships[place].activities.push(allMemberships[i]);
        }
    }
}
