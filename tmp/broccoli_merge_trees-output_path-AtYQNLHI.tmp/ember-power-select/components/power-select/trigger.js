define('ember-power-select/components/power-select/trigger', ['exports', 'ember-component', 'ember-power-select/templates/components/power-select/trigger'], function (exports, _emberComponent, _emberPowerSelectTemplatesComponentsPowerSelectTrigger) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberPowerSelectTemplatesComponentsPowerSelectTrigger['default'],
    tagName: '',

    // Actions
    actions: {
      clear: function clear(e) {
        e.stopPropagation();
        this.getAttr('select').actions.select(null);
      }
    }
  });
});