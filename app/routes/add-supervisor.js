import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        // Check to see if user is an admin
        if (this.get('session.data.authenticated.token_data.college_role') !== "god") {
            this.transitionTo("index");
        }
        return {
            "activity": activity,
            "sessionCode": param.SessionCode
        };
    }
});
