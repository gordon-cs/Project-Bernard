import Ember from 'ember';

export default Ember.Route.extend({

	model() {
		// Hardcoded with Dalton's ID number for demo
		return Ember.$.getJSON('http://ccttrain.gordon.edu/api/students/50100155/memberships');
	}
});
