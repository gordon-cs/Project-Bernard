import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {

    actions: {
        error(error, transition) {
          console.log(error.name);
          // if (error.status === 404) {
            return this.transitionTo('error')
          // }

      }

      // let controller = this.controllerFor('chapel-credits');
      // controller.set('loading', true);
      // transition.promise.finally(function() {
      //   controller.set('loading', false);
      // });

    },

    model: function() {

        let context = this;
        let people = [];
        let searchValue;

        //needed for error handling
        // let userInfo;
        // let routeUsername = param.Username;
        // let loggedInUsername = this.get("session.data.authenticated.token_data.user_name").toLowerCase();
        // let userLoggedIn = false;
        //
        // let isLoggedInUser = function() {
        //   if(routeUsername === loggedInUsername) {
        //     userLoggedIn = true;
        //   }
        //   return userLoggedIn;
        // };
        //
        // let catchNotFound = function() {
        //   if (error.status === 400) {
        //     console.log("error is found DO SOMEthing");
        //     userInfo = {
        //       "found": false
        //     };
        //   }
        //   else {
        //     throw error;
        //   }
        //
        // }


        let loadModel = function() {
            return {
                "searchValue": searchValue,
              //  "userInfo" : userInfo,
              //  "loggedInUsername" : loggedInUsername,
              //  "userLoggedIn" : userLoggedIn,
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
