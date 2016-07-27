import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        // Variables we will need later
        let context = this;
        let activity_code = param.ActivityCode;
        let college_role = this.get("session.data.authenticated.token_data.college_role");
        let id_number = this.get("session.data.authenticated.token_data.id");

        // Check if user has persmission
        let leading = college_role === "god";

        // Promise for supervisors
        let supervisorsPromise =  getAsync("/supervisors/activity/" + activity_code, context);

        // Promise for activity leaders
        let activityLeadersPromise =  getAsync("/memberships/activity/" + activity_code + "/leaders", context);

        // Wrapper for the activity promise
        let loadActivity = function ( ) {
            return getAsync("/activities/" + activity_code, context);
        }

        // Function to determine if logged-in user owns any of the objects
        // passed to the function.
        let checkIfInList = function ( result ) {
            for (let i = 0; i < result.length; i ++) {
                if (result[i].IDNumber == id_number) {
                    return true;
                }
            }
            return false;
        };

        // Wrapper function to load the model object.
        let loadModel = function ( result ) {
            return {
                "activity": result,
                "sessionCode": param.SessionCode
            };
        }


        /* COMPOSE PROMISES */
        if ( leading ) {
             return loadActivity( )
            .then( loadModel );
        }
        else {
            return Ember.RSVP.map( [supervisorsPromise, activityLeadersPromise], checkIfInList )
            .then( function( results ) {
                if( results[0] || results[1] ) {
                    return loadActivity( )
                    .then( loadModel );
                }
                else {
                    context.transitionTo("index");
                }
            });
        }

    }
});
