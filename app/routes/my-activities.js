import Ember from 'ember';

export default Ember.Route.extend({

	model() {
		var model = {
			"currentMemberships": [],
			"pastMemberships": []
		};
		var currentSession = null;
		Ember.$.ajax({
			type: "GET",
			url: "http://ccttrain.gordon.edu/api/sessions/current",
			async: false,
			success: function(data) {
				currentSession = data;
			},
			error: function(errorThrown) {
				console.log(errorThrown);
			}
		});
		Ember.$.ajax({
			type: "GET",
			url: "http://ccttrain.gordon.edu/api/students/50100155/memberships",
			async: false,
			success: function(data) {
				for (var i = 0; i < data.length; i ++) {
					if (data[i].SessionCode === currentSession.SessionCode) {
						model.currentMemberships.push(data[i]);
					}
					else {
						var session = data[i].SessionDescription;
						var place = null;
						var length = model.pastMemberships.length;
						for (var j = 0; j < model.pastMemberships.length; j ++) {
							if (model.pastMemberships[j].session === session) {
								place = j;
							}
						}
						if (place === null) {
							model.pastMemberships.push({
								"session": session,
								"activities": []
							});
							place = length ++;
						}
						model.pastMemberships[place].activities.push(data[i]);
					}
				}
			},
			error: function(errorThrown) {
				console.log(errorThrown);
			}
		});
		console.log(model);
		return model;
	}
});
