import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
      error(error, transition) {
        console.log(error.name);
        throw error;
      }

    }
});
