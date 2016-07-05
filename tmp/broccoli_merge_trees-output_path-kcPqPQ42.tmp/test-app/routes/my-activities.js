define('test-app/routes/my-activities', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return _ember['default'].$.getJSON('https://ccttrain.gordon.edu/api/students/50154997/memberships');
		}
	});
});