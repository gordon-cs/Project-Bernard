define('test-app/tests/helpers/resolver', ['exports', 'test-app/resolver', 'test-app/config/environment'], function (exports, _testAppResolver, _testAppConfigEnvironment) {

  var resolver = _testAppResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _testAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _testAppConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});