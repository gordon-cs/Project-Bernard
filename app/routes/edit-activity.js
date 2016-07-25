import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        // Check if user has persmission
        let leading = this.get("session.data.authenticated.token_data.college_role") === "god";

        // If they don't have god access check if they are a supervisor
        if (!leading) {
            let supervisors = getSync("/supervisors/activity/" + param.ActivityCode, this).data;
            for (let i = 0; i < supervisors.length; i ++) {
                if (supervisors[i].IDNumber == this.get("session.data.authenticated.token_data.id")) {
                    leading = true;
                }
            }
        }
        // If they don't have god access check if they are a leader
        if (!leading) {
            let leaders = getSync("/memberships/activity/" + param.ActivityCode + "/leaders", this).data;
            for (let i = 0; i < leaders.length; i ++) {
                if (leaders[i].IDNumber == this.get("session.data.authenticated.token_data.id")) {
                    leading = true;
                }
            }
        }
        // If not leading, redirect to index
        if (!leading) {
            this.transitionTo("index");
        }
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        return {
            "activity": activity,
            "sessionCode": param.SessionCode
        }
    }
});
