import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";
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
        //Variables we will need to fill
        let activity;;

        /* Promises */
        let loadActivity = function ( ) {
            return getAsync("/activities/" + param.ActivityCode, context);
        }
        /* End Promises */

        // Function expressions to be chained with the promises above.
        let initializeActivity = function ( result ) {
            activity = result;
        };

        let loadModel = function ( ) {
            return {
                "activity": activity,
                "sessionCode": param.SessionCode
            };
        }

        /* COMPOSE AWAY YO */
        return loadActivity()
        .then( initializeActivity )
        .then( loadModel );



    }
});
