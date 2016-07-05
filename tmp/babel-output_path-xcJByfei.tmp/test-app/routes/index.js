define("test-app/routes/index", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Route.extend({
        model: function model() {
            var model = {
                "activities": null,
                "sessions": null,
                "currentSession": null
            };
            _ember["default"].$.ajax({
                type: "GET",
                url: "https://ccttrain.gordon.edu/api/sessions",
                async: false,
                success: function success(data) {
                    model.sessions = data;
                },
                error: function error(errorThrown) {
                    console.log(errorThrown);
                }
            });
            _ember["default"].$.ajax({
                type: "GET",
                url: "https://ccttrain.gordon.edu/api/sessions/current",
                async: false,
                success: function success(data) {
                    model.currentSession = data;
                },
                error: function error(errorThrown) {
                    console.log(errorThrown);
                }
            });
            _ember["default"].$.ajax({
                type: "GET",
                url: "https://ccttrain.gordon.edu/api/sessions/" + model.currentSession.SessionCode + "/activities",
                async: false,
                success: function success(data) {
                    model.activities = data;
                },
                error: function error(errorThrown) {
                    console.log(errorThrown);
                }
            });
            console.log(model);
            return model;
        }
    });
});