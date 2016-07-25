import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        // Get all roles, this activity, and memberships for this activity
        let roles = getSync("/participations", this).data;
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        var memberships = getSync("/memberships/activity/" + param.ActivityCode, this).data;

        // Removes all memberships not in the current session/not relevant
        for (let i = 0; i < memberships.length; i ++) {
            if (memberships[i].SessionCode !== param.SessionCode) {
                memberships.splice(i, 1);
                i --;
            }
        }
        // Get all leaders for an activity
        let leaders = getSync("/memberships/activity/" + param.ActivityCode + "/leaders", this).data;

        let leading = this.get('session.data.authenticated.token_data.college_role') === "god";
        let IDNumber = this.get("session.data.authenticated.token_data.id");
        // If the logged in user matches anyone returned in leaders give them leader access
        for (let i = 0; i < leaders.length; i ++) {
            if (leaders[i].SessionCode == param.SessionCode && leaders[i].IDNumber == IDNumber) {
                leading = true;
            }
        }
        // Get all supervisors for an activity
        let supervisors = getSync("/supervisors/activity/" + param.ActivityCode, this).data;

        // If any of the supervisors match the user logged in give them leader access to activity
        for (let i = 0; i < supervisors.length; i ++) {
            if (supervisors[i].IDNumber == this.get("session.data.authenticated.token_data.id")) {
                leading = true;
            }
        }
        return {
            "activity": activity,
            "sessionCode": param.SessionCode,
            "roles": roles,
            "leading": leading,
            "memberships": memberships
        };
    }
});
