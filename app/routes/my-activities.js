import Ember from 'ember';

export default Ember.Route.extend({
	model(param) {
		var model = {

		}

		Ember.$.ajax({
			type: 'GET',
			url: 'https://ccttrain.gordon.edu/api/students/50154997/memberships',
			async: false,
			success: function(data) {
				model.memberships = data;
			},
			error: function(errorThrown) {
				console.log(errorThrown);
			}
		})
		return Ember.$.getJSON('https://ccttrain.gordon.edu/api/students/50154997/memberships');
	}
});
