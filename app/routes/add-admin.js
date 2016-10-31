import Ember from 'ember';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(param) {
      // Values we will need later.
      let context = this;
      let college_role = this.get('session.data.authenticated.token_data.college_role');

      let leading = college_role === "god";

      let model = {
          "leading": leading
      };

      return model;
  }
});
