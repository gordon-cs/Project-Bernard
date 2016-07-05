define('test-app/routes/add-membership', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model(param) {
            var response = {};
            _ember['default'].$.ajax({
                dataType: "json",
                url: 'https://ccttrain.gordon.edu/api/activities/' + param.ACT_CDE,
                async: false,
                success: function success(data) {
                    response.activity = data;
                }
            });
            _ember['default'].$.ajax({
                dataType: "json",
                url: 'https://ccttrain.gordon.edu/api/sessions',
                async: false,
                success: function success(data) {
                    response.sessions = data;
                }
            });
            _ember['default'].$.ajax({
                dataType: "json",
                url: 'https://ccttrain.gordon.edu/api/roles',
                async: false,
                success: function success(data) {
                    response.roles = data;
                }
            });
            return response;
        }
    });
});