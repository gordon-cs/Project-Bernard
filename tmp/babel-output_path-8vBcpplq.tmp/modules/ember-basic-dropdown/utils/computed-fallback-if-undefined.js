

export default computedFallbackIfUndefined;
import computed from 'ember-computed';
function computedFallbackIfUndefined(fallback) {
  return computed({
    get: function get() {
      return fallback;
    },
    set: function set(_, v) {
      return v === undefined ? fallback : v;
    }
  });
}