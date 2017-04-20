import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {
    activate() {
        this.controllerFor("application").getRequests();
        this.controllerFor("application").checkAdmin();
    }
});
