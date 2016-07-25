import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {
    setupController: function () {
        $(window).on('beforeunload', () => {
            this.get("session").invalidate();
        });
    },
    activate() {
        this.controllerFor("application").getRequests();
    }
});
