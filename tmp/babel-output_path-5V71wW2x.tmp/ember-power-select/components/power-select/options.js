define('ember-power-select/components/power-select/options', ['exports', 'ember-component', 'jquery', 'ember-power-select/templates/components/power-select/options', 'ember-computed'], function (exports, _emberComponent, _jquery, _emberPowerSelectTemplatesComponentsPowerSelectOptions, _emberComputed) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    isTouchDevice: !!self.window && 'ontouchstart' in self.window,
    layout: _emberPowerSelectTemplatesComponentsPowerSelectOptions['default'],
    tagName: 'ul',
    attributeBindings: ['role', 'aria-controls'],
    role: 'listbox',

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      if (this.get('role') === 'group') {
        return;
      }
      var findOptionAndPerform = function findOptionAndPerform(action, e) {
        var optionItem = (0, _jquery['default'])(e.target).closest('[data-option-index]');
        if (!optionItem || !(0 in optionItem)) {
          return;
        }
        if (optionItem.closest('[aria-disabled=true]').length) {
          return;
        } // Abort if the item or an ancestor is disabled
        var optionIndex = optionItem[0].getAttribute('data-option-index');
        action(_this._optionFromIndex(optionIndex), e);
      };
      this.element.addEventListener('mouseup', function (e) {
        return findOptionAndPerform(_this.get('select.actions.choose'), e);
      });
      this.element.addEventListener('mouseover', function (e) {
        return findOptionAndPerform(_this.get('select.actions.highlight'), e);
      });
      if (this.get('isTouchDevice')) {
        this._addTouchEvents();
      }
      if (this.get('role') !== 'group') {
        var select = this.get('select');
        select.actions.scrollTo(select.highlighted);
      }
    },

    // CPs
    'aria-controls': (0, _emberComputed['default'])('select._id', function () {
      return 'ember-power-select-trigger-' + this.get('select._id');
    }),

    // Methods
    _addTouchEvents: function _addTouchEvents() {
      var _this2 = this;

      var touchMoveHandler = function touchMoveHandler() {
        _this2.hasMoved = true;
        _this2.element.removeEventListener('touchmove', touchMoveHandler);
      };
      // Add touch event handlers to detect taps
      this.element.addEventListener('touchstart', function () {
        _this2.element.addEventListener('touchmove', touchMoveHandler);
      });
      this.element.addEventListener('touchend', function (e) {
        var optionItem = (0, _jquery['default'])(e.target).closest('[data-option-index]');

        if (!optionItem || !(0 in optionItem)) {
          return;
        }

        e.preventDefault();
        if (_this2.hasMoved) {
          _this2.hasMoved = false;
          return;
        }

        var optionIndex = optionItem[0].getAttribute('data-option-index');
        _this2.get('select.actions.choose')(_this2._optionFromIndex(optionIndex), e);
      });
    },

    _optionFromIndex: function _optionFromIndex(index) {
      var parts = index.split('.');
      var options = this.get('options');
      var option = options[parseInt(parts[0], 10)];
      for (var i = 1; i < parts.length; i++) {
        option = option.options[parseInt(parts[i], 10)];
      }
      return option;
    }
  });
});