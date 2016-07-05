define("test-app/routes/specific-activity", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Route.extend({
        model: function model(param) {
            var model = {
                "following": false,
                "leader": false,
                "leaders": null,
                session: null
            };
            _ember["default"].$.ajax({
                type: "GET",
                url: 'https://ccttrain.gordon.edu/api/activities/' + param.ActivityCode,
                async: false,
                success: function success(data) {
                    model.activity = data;
                },
                error: function error(errorThrown) {
                    console.log(errorThrown);
                }
            });
            _ember["default"].$.ajax({
                type: "GET",
                url: 'https://ccttrain.gordon.edu/api/sessions/' + param.SessionCode,
                async: false,
                success: function success(data) {
                    model.session = data;
                },
                error: function error(errorThrown) {
                    console.log(errorThrown);
                }
            });
            _ember["default"].$.ajax({
                type: "GET",
                url: 'https://ccttrain.gordon.edu/api/students/50154997/memberships',
                async: false,
                success: function success(data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ActivityCode === param.ActivityCode && data[i].IDNumber === "50154997" && data[i].SessionCode === param.SessionCode.trim() && data[i].Participation === "GUEST") {
                            model.membershipID = data[i].MembershipID;
                            model.following = true;
                        }
                    }
                },
                error: function error(errorThrown) {
                    console.log(errorTrown);
                }
            });
            _ember["default"].$.ajax({
                type: "GET",
                url: 'https://ccttrain.gordon.edu/api/activities/' + param.ActivityCode + "/leaders",
                async: false,
                success: function success(data) {
                    model.leaders = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].SessionCode === model.session.SessionCode) {
                            model.leaders.push(data[i]);
                            if (data[i].IDNumber === "50154997") {
                                model.leader = true;
                            }
                        }
                    }
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