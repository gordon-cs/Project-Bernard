define("test-app/controllers/index", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Controller.extend({
        actions: {
            selectSession: function selectSession(session) {
                var activities = null;
                _ember["default"].$.ajax({
                    type: "GET",
                    url: "https://ccttrain.gordon.edu/api/sessions/" + session.SessionCode.trim() + "/activities",
                    async: false,
                    success: function success(data) {
                        activities = data;
                        console.log(data);
                    },
                    error: function error(errorThrown) {
                        console.log(errorThrown);
                    }
                });
                this.set('model.activities', activities);
                this.set('model.currentSession', session);
            }
        }
    });
});