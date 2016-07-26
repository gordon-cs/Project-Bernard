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

        // Variables we will need to fill
        let activity;
        let supervisors;
        let leaders;

        /*  Promises */
        let loadSupervisors = function ( ) {
            console.log(1);
            return getAsync("/supervisors/activity/" + activity_code, context);
        };

        let loadActivityleaders = function ( ) {
            console.log(4);
            return getAsync("/memberships/activity/" + activity_code + "/leaders", context);
        }

        let loadActivity = function ( ) {
            return getAsync("/activities/" + activity_code, context);
        }

        /* End Promises */


        // Function expressions to be chained with promises above.
        let initializeActivity = function ( result ) {
            activity = result;
        };

        let initializeActivityLeaders = function ( result ) {
            console.log(5);
            leaders = result;
        };

        let initializeSupervisors = function ( result ) {
            console.log(2);
            supervisors = result;
        };

        let checkIfSupervisor = function ( ) {
            console.log(3);
            for (let i = 0; i < supervisors.length; i ++) {
                if (supervisors[i].IDNumber == id_number) {
                    leading = true;
                }
            }
        };

        let checkIfActivityLeader = function ( ) {
            for (let i = 0; i < leaders.length; i ++) {
                if (leaders[i].IDNumber == id_number) {
                    leading = true;
                }
            }
        };

        let checkIfNeither = function ( ) {
                this.transitionTo("index");
        }

        let loadModel = function ( ) {
            console.log(6);
            return {
                "activity": activity,
                "sessionCode": param.SessionCode
            };
        }


        /* COMPOSE PROMISES */
        return loadActivity()
        .then( initializeActivity )
        .then( function () {
            console.log(0);
            if(!leading) {
                loadSupervisors()
                .then( initializeSupervisors )
                .then( checkIfSupervisor )
                .then( function () {
                    if (!leading) {
                        loadActivityleaders()
                        .then( initializeActivityLeaders )
                        .then( checkIfActivityLeader )
                        .then( function () {
                            if(!leading) {
                                context.transitionTo("index");
                            }
                        });
                    }
                });
            }
        } )
        .then( loadModel );

        // // If they don't have god access check if they are a supervisor
        // if (!leading) {
        //     let supervisors = getSync("/supervisors/activity/" + param.ActivityCode, this).data;
        //     for (let i = 0; i < supervisors.length; i ++) {
        //         if (supervisors[i].IDNumber == this.get("session.data.authenticated.token_data.id")) {
        //             leading = true;
        //         }
        //     }
        // }
        // // If they don't have god access check if they are a leader
        // if (!leading) {
        //     let leaders = getSync("/memberships/activity/" + param.ActivityCode + "/leaders", this).data;
        //     for (let i = 0; i < leaders.length; i ++) {
        //         if (leaders[i].IDNumber == this.get("session.data.authenticated.token_data.id")) {
        //             leading = true;
        //         }
        //     }
        // }
        // // If not leading, redirect to index
        // if (!leading) {
        //     this.transitionTo("index");
        // }
        // let activity = getSync("/activities/" + param.ActivityCode, this).data;
        // return {
        //     "activity": activity,
        //     "sessionCode": param.SessionCode
        // }
    }
});
