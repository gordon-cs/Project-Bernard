import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {
    activate() {
        let controller = this.controllerFor("application");
        controller.getRequests();
    }
});
