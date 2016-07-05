define('test-app/app', ['exports', 'ember', 'test-app/resolver', 'ember-load-initializers', 'test-app/config/environment'], function (exports, _ember, _testAppResolver, _emberLoadInitializers, _testAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _testAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _testAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _testAppResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _testAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});