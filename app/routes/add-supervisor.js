import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        // Check to see if user is an admin
        let leading = this.get('session.data.authenticated.token_data.college_role') === "god";
        return {
            "activity": activity,
            "sessionCode": param.SessionCode,
            "leading": leading
        };
    }
});
