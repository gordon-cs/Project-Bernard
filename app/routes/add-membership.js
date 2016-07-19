import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        let roles = getSync("/participations", this).data;
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        // Check if user is a leader or admin
        let leaders = getSync("/memberships/activity/" + param.ActivityCode + "/leaders", this).data;
        let leading = this.get('session.data.authenticated.token_data.college_role') === "god";
        let IDNumber = this.get("session.data.authenticated.token_data.id");
        for (let i = 0; i < leaders.length; i ++) {
            if (allLeaders[i].SessionCode === param.SessionCode &&
                allLeaders[i].IDNumber === IDNumber)
            {
                leading = true;
            }
        }
        return {
            "activity": activity,
            "roles": roles,
            "leading": leading
        };
    }
});
