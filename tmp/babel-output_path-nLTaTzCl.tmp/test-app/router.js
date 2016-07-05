define('test-app/router', ['exports', 'ember', 'test-app/config/environment'], function (exports, _ember, _testAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _testAppConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('my-activities');
    this.route('specific-activity', { path: '/specific-activity/:SessionCode/:ActivityCode' });
    this.route('add-membership', { path: '/add-membership/:ActivityCode' });
  });

  exports['default'] = Router;
});