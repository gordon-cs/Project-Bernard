import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

/*  Route for the add membership page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        // Values we will need later.
        let context = this;
        let college_role = this.get('session.data.authenticated.token_data.college_role');
        let id_number = this.get("session.data.authenticated.token_data.id");
        let activity_code = param.ActivityCode;
        let session_code = param.SessionCode;

        // Variables we need to fill/update
        let roles;
        let activity;
        let memberships;
        let leading = college_role === "god";
        let leaders;
        let supervisors;

        /* Promises */
        let loadRoles = function () {
            return getAsync("/participations", context);
        };


        let loadActivity = function () {
            return getAsync("/activities/" + activity_code, context);
        };

        let loadActivityLeaders = function () {
            return getAsync("/memberships/activity/" + activity_code + "/leaders", context);
        };

        let loadMemberships = function () {
            return getAsync("/memberships/activity/" + activity_code, context);
        };

        let loadSupervisors = function () {
            return getAsync("/supervisors/activity/" + activity_code, context);
        };
        /* End Promises */


        // These functions expressions are to be chained to the promises above.
        let initializeRoles = function (result) {
            roles = result;
        };

        let initializeActivity = function (result) {
            activity = result;
        };

        let initializeMemberships = function (result) {
            memberships = result;
        };

        let initializeActivityLeaders = function (result) {
            leaders = result;
        };

        let initializeSupervisors = function (result)  {
            supervisors = result;
        };

        let filterMemberships = function () {
            // Ugly code that james wrote ...jk jk jk jk
            for (let i = 0; i < memberships.length; i ++) {
                if (memberships[i].SessionCode !== param.SessionCode) {
                    memberships.splice(i, 1);
                    i --;
                }
            }
        };

        let setSwitches = function () {
            // Check if leader
            for (let i = 0; i < leaders.length; i ++) {
                if (leaders[i].SessionCode == session_code && leaders[i].IDNumber == id_number) {
                    leading = true;
                }
            }
            // Check if supervisor
            for (let i = 0; i < supervisors.length; i ++) {
                if (supervisors[i].IDNumber == id_number) {
                    leading = true;
                }
            }
        }

        let loadModel = function () {
            return {
                "activity": activity,
                "sessionCode": param.SessionCode,
                "roles": roles,
                "leading": leading,
                "memberships": memberships
            };
        };


        /* Compose those promises like there is no tomorrow */
        return loadRoles()
        .then(initializeRoles)
        .then(loadActivity)
        .then(initializeActivity)
        .then(loadMemberships)
        .then(initializeMemberships)
        .then(filterMemberships)
        .then(loadActivityLeaders)
        .then(initializeActivityLeaders)
        .then(loadSupervisors)
        .then(initializeSupervisors)
        .then(setSwitches)
        .then(loadModel);

        }
});
