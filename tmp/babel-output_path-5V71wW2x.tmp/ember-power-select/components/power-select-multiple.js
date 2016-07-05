define('ember-power-select/components/power-select-multiple', ['exports', 'ember-component', 'ember-computed', 'ember-power-select/templates/components/power-select-multiple', 'ember-power-select/utils/computed-fallback-if-undefined'], function (exports, _emberComponent, _emberComputed, _emberPowerSelectTemplatesComponentsPowerSelectMultiple, _emberPowerSelectUtilsComputedFallbackIfUndefined) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberPowerSelectTemplatesComponentsPowerSelectMultiple['default'],
    // Config
    triggerComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select-multiple/trigger'),
    beforeOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),

    // CPs
    concatenatedTriggerClass: (0, _emberComputed['default'])('triggerClass', function () {
      var classes = ['ember-power-select-multiple-trigger'];
      if (this.get('triggerClass')) {
        classes.push(this.get('triggerClass'));
      }
      return classes.join(' ');
    }),

    selected: (0, _emberComputed['default'])({
      get: function get() {
        return [];
      },
      set: function set(_, v) {
        if (v === null || v === undefined) {
          return [];
        }
        return v;
      }
    }),

    // Actions
    actions: {
      handleOpen: function handleOpen(select, e) {
        var action = this.get('onopen');
        if (action && action(select, e) === false) {
          return false;
        }
        this.focusInput();
      },

      handleFocus: function handleFocus(select, e) {
        var action = this.get('onfocus');
        if (action) {
          action(select, e);
        }
        this.focusInput();
      },

      handleKeydown: function handleKeydown(select, e) {
        var action = this.get('onkeydown');
        if (action && action(select, e) === false) {
          e.stopPropagation();
          return false;
        }
        if (e.keyCode === 13 && select.isOpen) {
          e.stopPropagation();
          if (select.highlighted !== undefined) {
            if (!select.selected || select.selected.indexOf(select.highlighted) === -1) {
              select.actions.choose(select.highlighted, e);
              return false;
            } else {
              select.actions.close(e);
              return false;
            }
          } else {
            select.actions.close(e);
            return false;
          }
        }
      },

      buildSelection: function buildSelection(option, select) {
        var newSelection = (select.selected || []).slice(0);
        var idx = newSelection.indexOf(option);
        if (idx > -1) {
          newSelection.splice(idx, 1);
        } else {
          newSelection.push(option);
        }
        return newSelection;
      }
    },

    // Methods
    focusInput: function focusInput() {
      var input = this.element.querySelector('.ember-power-select-trigger-multiple-input');
      if (input) {
        input.focus();
      }
    }
  });
});