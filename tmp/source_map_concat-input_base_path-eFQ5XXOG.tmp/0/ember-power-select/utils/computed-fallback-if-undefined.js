define('ember-power-select/utils/computed-fallback-if-undefined', ['exports', 'ember-computed'], function (exports, _emberComputed) {
  'use strict';

  exports['default'] = computedFallbackIfUndefined;

  function computedFallbackIfUndefined(fallback) {
    return (0, _emberComputed['default'])({
      get: function get() {
        return fallback;
      },
      set: function set(_, v) {
        return v === undefined ? fallback : v;
      }
    });
  }
});