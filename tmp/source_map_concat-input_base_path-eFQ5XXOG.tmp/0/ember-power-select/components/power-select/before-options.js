define('ember-power-select/components/power-select/before-options', ['exports', 'ember-component', 'ember-runloop', 'ember-power-select/templates/components/power-select/before-options'], function (exports, _emberComponent, _emberRunloop, _emberPowerSelectTemplatesComponentsPowerSelectBeforeOptions) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    tagName: '',
    layout: _emberPowerSelectTemplatesComponentsPowerSelectBeforeOptions['default'],

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.focusInput();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this.getAttr('searchEnabled')) {
        this.getAttr('select').actions.search('');
      }
    },

    // Actions
    actions: {
      onKeydown: function onKeydown(e) {
        var onKeydown = this.get('onKeydown');
        if (onKeydown(e) === false) {
          return false;
        }
        if (e.keyCode === 13) {
          var select = this.get('select');
          select.actions.close(e);
        }
      }
    },

    // Methods
    focusInput: function focusInput() {
      this.input = self.document.querySelector('.ember-power-select-search-input');
      if (this.input) {
        (0, _emberRunloop.scheduleOnce)('afterRender', this.input, 'focus');
      }
    }
  });
});