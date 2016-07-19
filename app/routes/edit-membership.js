import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/"

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    beforeModel() {
        this.set("comments", null);
        this.set("role", null);
    },
    model(param) {
        let roles = getSync("/participations", this).data;
        let membership = getSync("/memberships/" + param.MembershipID, this).data;
        return {
            "roles": roles,
            "membership": membership
        };
    }
});
