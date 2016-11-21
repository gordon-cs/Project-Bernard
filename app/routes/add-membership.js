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
        let advisors;

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

        let loadadvisors = function () {
            return getAsync("/memberships/activity/" + activity_code + "/advisors", context);
        };
        /* End Promises */


        // These functions expressions are to be chained to the promises above.
        let initializeRoles = function (result) {
            roles = result;
        };

        let initializeActivity = function (result) {
            activity = result;
        };

        let initializeActivityLeaders = function (result) {
            leaders = result;
        };

        let initializeadvisors = function (result)  {
            advisors = result;
        };

        let filterMemberships = function () {
            // Ugly code that james wrote ...jk jk jk jk

        };

        let setSwitches = function () {
            // Check if leader
            for (let i = 0; i < leaders.length; i++) {
                if (leaders[i].SessionCode == session_code && leaders[i].IDNumber == id_number) {
                    leading = true;
                }
            }
            // Check if advisor
            for (let i = 0; i < advisors.length; i++) {
                if (advisors[i].IDNumber == id_number) {
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
        .then(loadActivityLeaders)
        .then(initializeActivityLeaders)
        .then(loadadvisors)
        .then(initializeadvisors)
        .then(setSwitches)
        .then(loadModel);

        }
});
