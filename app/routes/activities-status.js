import Ember from 'ember';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Route for the activities' status page, for a person to see the open/closed activities
 *  for which they are the group admin.
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

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model: function (param) {
        let context = this;

        /* Variables to fill */
        let openActivities;
        let closedActivities;
        let session;
        let isSuperAdmin;

        /* User info */
        let id_number = this.get("session.data.authenticated.token_data.id");
        let college_role = this.get('session.data.authenticated.token_data.college_role');
        isSuperAdmin = college_role === "god";

        /* Promises */

        // Load the current session
        let loadCurrentSession = function() {
          return getAsync("/sessions/current", context);
       };

       let initializeCurrentSession = function (result) {
         session = result;
       }

        // Load the open activities for which the user has group admin privileges
        let loadOpenActivities = function () {
          if (college_role === "god") {
            return getAsync("/activities/open", context);
          }
          else {
            return getAsync("/activities/" + id_number +"/open", context);
          }
        };

        let initializeOpenActivities = function (result) {
          openActivities = result;
        }

        // Load the closed activities for which the user has group admin privileges
        let loadCloseActivities = function () {
          if (college_role === "god") {
            return getAsync("/activities/closed", context);
          }
          else {
            return getAsync("/activities/" + id_number +"/closed", context);
          }
        };

        let initializeClosedActivities = function (result) {
          closedActivities = result;
        }

        // Populate the model
        let loadModel = function() {
          return {
            "isSuperAdmin": isSuperAdmin,
            "session": session,
            "openActivities": openActivities,
            "closedActivities": closedActivities
          };
        };

        return loadCurrentSession()
          .then(initializeCurrentSession)
          .then(loadOpenActivities)
          .then(initializeOpenActivities)
          .then(loadCloseActivities)
          .then(initializeClosedActivities)
          .then(loadModel)
      }
});
