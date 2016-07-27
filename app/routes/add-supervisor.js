import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(param) {
        // Variables we will need later
        let context = this;
        let college_role = this.get('session.data.authenticated.token_data.college_role');

        // Check to see if user is an admin
        if (college_role !== "god") {
            this.transitionTo("index");
        }

        // Wrapper for the activities promise.
        let loadActivity = function ( ) {
            return getAsync("/activities/" + param.ActivityCode, context);
        }

        // Wrapper function to load the model objects.
        let loadModel = function ( result ) {
            return {
                "activity": result,
                "sessionCode": param.SessionCode
            };
        }

        /* COMPOSE AWAY YO */
         return loadActivity()
        .then( loadModel );



    }
});
