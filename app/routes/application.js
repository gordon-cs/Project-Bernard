import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {

    actions: {
        error(error, transition) {
          console.log(error);
            return this.transitionTo('error')
      }
    },

    model: function() {

        let context = this;
        let people = [];
        let searchValue;



        let loadModel = function() {
            return {
                "searchValue": searchValue,
                'people': people
            };

        };
        return loadModel(

        );
    },
    activate() {
        this.controllerFor("application").getRequests();
        this.controllerFor("application").checkAdmin();
        this.controllerFor("application").checkReadOnly();
    }
});
