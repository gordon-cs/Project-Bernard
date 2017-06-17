import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params, transition) {


    let context = this;

    let id_number = this.get("session.data.authenticated.token_data.id");




    let loadChapel =  getAsync("/chapel_event/Student/" + id_number, context);


    let loadModel = function(result) {
      console.log(result);
      return {
        "chapelEvents": result
      };
    };

    return (loadChapel)
      .then(loadModel)
  }



});
