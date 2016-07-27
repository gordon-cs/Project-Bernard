import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        let theModel = {};
        let context = this;
        let id_number = this.get("session.data.authenticated.token_data.id");
        let college_role = this.get("session.data.authenticated.token_data.college_role");
        theModel.leading = college_role === "god";

        let rolesPromise = getAsync("/participations", context);
        let membershipPromise = getAsync("/memberships/" + param.MembershipID, context);


        let loadMembership  = function ( model ) {
            return membershipPromise
            .then( function ( result ) {
                console.log(result);
                model.membership = result;
                model.ActivityCode = result.ActivityCode;
                return Ember.RSVP.hash( model );
            });
        };

        let loadRoles = function ( model ) {
            return rolesPromise
            .then( function ( result ) {
                model.roles = result;
                return Ember.RSVP.hash( model );
            });
        };

        let checkIfSupervisor = function ( model ) {
            if (!model.leading) {
                return getAsync("/supervisors/activity/" + model.ActivityCode, context)
                .then( isIDInList )
                .then( function ( bool ) {
                    model.leading = bool;
                    return Ember.RSVP.hash( model );
                });
            }
            return model
        };

        let checkIfActivityLeader = function ( model ) {
            if (!model.leading) {
                return getAsync("/memberships/activity/" + model.ActivityCode + "/leaders", context)
                .then( isIDInList )
                .then( function ( bool ) {
                    model.leading = bool;
                    return Ember.RSVP.hash( model );
                });
            }
            return Ember.RSVP.hash( model) ;
        };

        let redirectIfNeither = function ( model ) {
            if (!model.leading) {
                context.transitionTo("index");
            }
            else {
                return Ember.RSVP.hash(model);
            }
        };

        // Helper function
        let isIDInList = function ( result ) {
            console.log( result );
            for (let i = 0; i < result.length; i++)
            {
                if (result[i].IDNumber == id_number ) {
                    return true;
                }
            }
            return false;
        };

        let loadModel = function ( model ) {
            return Ember.RSVP.hash( model );
        };

        return loadMembership ( theModel )
        .then( loadRoles )
        .then( checkIfSupervisor )
        .then( checkIfActivityLeader )
        .then( redirectIfNeither )
        .then( loadModel );
    }
});
