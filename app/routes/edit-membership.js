import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        let roles = getSync("/participations", this).data;
        let membership = getSync("/memberships/" + param.MembershipID, this).data;
        // Check if user has permission
        let leading = this.get("session.data.authenticated.token_data.college_role") === "god";
        if (!leading) {
            let supervisors = getSync("/supervisors/acivity/" + membership.ActivityCode, this).data;
            for (let i = 0; i < supervisors.length; i ++) {
                if (supervisors[i].IDNumber === this.get("session.data.authenticated.token_data.id")) {
                    leading = true;
                }
            }
        }
        if (!leading) {
            let leaders = getSync("/memberships/activity/" + membership.ActivityCode + "/leaders", this).data;
            for (let i = 0; i < leaders.length; i ++) {
                if (leader[i].IDNumber === this.get("session.data.authenticated.token_data.id")) {
                    leading = true;
                }
            }
        }
        // If not leading, redirect to index
        if (!leading) {
            this.transitionTo("index");
        }
        return {
            "roles": roles,
            "membership": membership
        };
    }
});
