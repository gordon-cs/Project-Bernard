import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        let activity = getSync("/activities/" + param.ActivityCode, this).data;

        return {
            "activity": activity,
            "sessionCode": param.SessionCode
        };
    }
});
