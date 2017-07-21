import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Route for the what's available (all activities) page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    /* If the user has read-only permission, the user will be
     * redirected to home page */
    beforeModel() {
        let college_role = this.get("session.data.authenticated.token_data.college_role");
        if (college_role == "readonly") {
            this.transitionTo("index");
        }
    },
    model: function(params, transition) {

        let context = this;

        /* Variables to fill */
        let sessions;
        let selectedSession;
        let activities;
        let activitiesShown;
        let types = [];
        let selectedType;
        let reversedSessions = [];
        let searchValue;


        /* Promises */
        let loadSessions = function () {
            return getAsync("/sessions", context);
        };
        let loadCurrentSession = function () {
            let selectedSessionCode = transition.queryParams.sessionCode;
            if (selectedSessionCode != null)
            {
              return getAsync("/sessions/"+selectedSessionCode, context);
            }
            else {
              return getAsync("/sessions/current", context);
            }
        };

        let loadActivities = function () {
            return getAsync("/activities/session/" + selectedSession.SessionCode, context);
        };
        let loadTypes = function() {
            return getAsync("/activities/session/" + selectedSession.SessionCode + "/types", context);
        };
        /* End Promises */

        // These functions expressions are to be chained to the promises above.
        let initializeSessions = function (result) {
            sessions = result;
            for (let i = sessions.length - 1; i >= 0; i --) {
                reversedSessions.push(sessions[i]);
            }
        };

        let initializeSelectedSession = function (result) {
            selectedSession = result;
        };

        let initializeActivities = function (result) {
            activities = result;
            sortJsonArray(activities , "ActivityDescription");

        };

        let initializeTypes = function (result) {
            types = result;
            types.push("All");
            types = types.sort();
        };

        let initializeActivitiesShown = function() {
            selectedType = transition.queryParams.selectedType;
            console.log(selectedType);
            if (selectedType && selectedType.toLowerCase() != "All".toLowerCase()) {
                let newList = [];
                for (let i = 0; i < activities.length; i++) {
                    if (activities[i].ActivityTypeDescription.toLowerCase() == selectedType.toLowerCase()) {
                        newList.push(activities[i]);
                    }
                }
                activitiesShown = newList;
            }
            else {
                activitiesShown = activities;
            }
        }

        let loadModel = function () {
            // Return the resolved value
            return {
                "activities": activities,
                "activitiesShown": activitiesShown,
                "activitiesFilled" : (activities.length > 0),
                "sessions": reversedSessions,
                "selectedSession": selectedSession,
                "activityTypes": types,
                "selectedType": selectedType ? selectedType : "All",
                "searchValue" : ""
            };
        };

        /* Composing Promises like a composer yo ♬ ♭ ♮♬ ♭ ♮♬ ♭ ♮*/
        return loadSessions()
        .then(initializeSessions)
        .then(loadCurrentSession)
        .then(initializeSelectedSession)
        .then(loadActivities)
        .then(initializeActivities)
        .then(initializeActivitiesShown)
        .then(loadTypes)
        .then(initializeTypes)
        .then(loadModel)

    }
});
