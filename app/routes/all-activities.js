import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Route for the what's available (all activities) page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {

        let context = this;

        /* Variables to fill */
        let sessions;
        let currentSession;
        let activities;
        let types = [];
        let reversedSessions = [];


        /* Promises */
        let loadSessions = function () {
            return getAsync("/sessions", context);
        };
        let loadCurrentSession = function () {
          // check if there is a queryParam, and if so, load /
          // let sessionQueryParam = queryParams["SessionCode"];
          // if (sessionQueryParam != null) {
          //   return {
          //     SessionCode: sessionQueryParam
          //   };
          // }
          // else{
          //   return getAsync("/sessions/current", context);
          // }
          return getAsync("/sessions/current", context);
        };
        let loadActivities = function () {
            return getAsync("/activities/session/" + currentSession.SessionCode, context);
        };
        let loadTypes = function() {
            return getAsync("/activities/session/" + currentSession.SessionCode + "/types", context);
        }
        /* End Promises */

        // These functions expressions are to be chained to the promises above.
        let initializeSessions = function (result) {
            sessions = result;
            for (let i = sessions.length - 1; i >= 0; i --) {
                reversedSessions.push(sessions[i]);
            }
        };

        let initializeCurrentSession = function (result) {
            currentSession = result;
        };

        let initializeActivities = function (result) {
            activities = result;
            sortJsonArray(activities , "ActivityDescription");

        };

        let initializeTypes = function (result) {
            types = result;
            types.push("All");
            types = types.sort();
        }
        let loadModel = function () {
            // Return the resolved value
            return {
                "activities": activities,
                "activitiesShown": activities,
                "activitiesFilled" : (activities.length > 0),
                "sessions": reversedSessions,
                "currentSession": currentSession,
                "activityTypes": types,
                "selectedType": "All"
            };
        };

        /* Composing Promises like a composer yo ♬ ♭ ♮♬ ♭ ♮♬ ♭ ♮*/
        return loadSessions()
        .then(initializeSessions)
        .then(loadCurrentSession)
        .then(initializeCurrentSession)
        .then(loadActivities)
        .then(initializeActivities)
        .then(loadTypes)
        .then(initializeTypes)
        .then(loadModel)

    }
});
