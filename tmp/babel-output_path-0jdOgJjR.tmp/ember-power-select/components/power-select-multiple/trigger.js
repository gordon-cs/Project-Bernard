define('ember-power-select/components/power-select-multiple/trigger', ['exports', 'ember', 'ember-component', 'ember-power-select/templates/components/power-select-multiple/trigger', 'ember-metal/get', 'ember-computed', 'ember-metal/observer', 'ember-service/inject', 'ember-runloop', 'ember-metal/utils', 'ember-utils', 'ember-string'], function (exports, _ember, _emberComponent, _emberPowerSelectTemplatesComponentsPowerSelectMultipleTrigger, _emberMetalGet, _emberComputed, _emberMetalObserver, _emberServiceInject, _emberRunloop, _emberMetalUtils, _emberUtils, _emberString) {
  'use strict';

  var testing = _ember['default'].testing;

  var ua = self.window && self.window.navigator ? self.window.navigator.userAgent : '';
  var isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  var isTouchDevice = testing || !!self.window && 'ontouchstart' in self.window;

  exports['default'] = _emberComponent['default'].extend({
    tagName: '',
    layout: _emberPowerSelectTemplatesComponentsPowerSelectMultipleTrigger['default'],
    textMeasurer: (0, _emberServiceInject['default'])(),
    _lastIsOpen: false,

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      var select = this.get('select');
      this.input = document.getElementById('ember-power-select-trigger-multiple-input-' + select._id);
      this.inputFont = this.input ? window.getComputedStyle(this.input).font : null;
      var optionsList = document.getElementById('ember-power-select-multiple-options-' + select._id);
      var chooseOption = function chooseOption(e) {
        var selectedIndex = e.target.getAttribute('data-selected-index');
        if (selectedIndex) {
          e.stopPropagation();
          e.preventDefault();

          var _select = _this.getAttr('select');
          var object = _this.selectedObject(_select.selected, selectedIndex);
          _select.actions.choose(object);
        }
      };
      if (isTouchDevice) {
        optionsList.addEventListener('touchstart', chooseOption);
      }
      optionsList.addEventListener('mousedown', chooseOption);
    },

    // Observers
    openObserver: (0, _emberMetalObserver['default'])('select.isOpen', function () {
      var select = this.get('select');
      if (this._lastIsOpen && !select.isOpen) {
        (0, _emberRunloop.scheduleOnce)('actions', null, select.actions.search, '');
      }
      this._lastIsOpen = select.isOpen;
    }),

    // CPs
    triggerMultipleInputStyle: (0, _emberComputed['default'])('select.searchText.length', 'select.selected.length', function () {
      var select = this.get('select');
      select.actions.reposition();
      if (!select.selected || select.selected.length === 0) {
        return (0, _emberString.htmlSafe)('width: 100%;');
      } else {
        var textWidth = 0;
        if (this.inputFont) {
          textWidth = this.get('textMeasurer').width(select.searchText, this.inputFont);
        }
        return (0, _emberString.htmlSafe)('width: ' + (textWidth + 25) + 'px');
      }
    }),

    maybePlaceholder: (0, _emberComputed['default'])('placeholder', 'select.selected.length', function () {
      if (isIE) {
        return null;
      }
      var select = this.getAttr('select');
      return !select.selected || (0, _emberMetalGet['default'])(select.selected, 'length') === 0 ? this.get('placeholder') || '' : '';
    }),

    // Actions
    actions: {
      onInput: function onInput(e) {
        var action = this.get('onInput');
        if (action && action(e) === false) {
          return;
        }
        this.getAttr('select').actions.open(e);
      },

      onKeydown: function onKeydown(e) {
        var _getProperties = this.getProperties('onKeydown', 'select');

        var onKeydown = _getProperties.onKeydown;
        var select = _getProperties.select;

        if (onKeydown && onKeydown(e) === false) {
          e.stopPropagation();
          return false;
        }
        if (e.keyCode === 8) {
          e.stopPropagation();
          if ((0, _emberUtils.isBlank)(e.target.value)) {
            var lastSelection = select.selected[select.selected.length - 1];
            if (lastSelection) {
              select.actions.select(this.get('buildSelection')(lastSelection, select), e);
              if (typeof lastSelection === 'string') {
                select.actions.search(lastSelection);
              } else {
                var searchField = this.get('searchField');
                (0, _emberMetalUtils.assert)('`{{power-select-multiple}}` requires a `searchField` when the options are not strings to remove options using backspace', searchField);
                select.actions.search((0, _emberMetalGet['default'])(lastSelection, searchField));
              }
              select.actions.open(e);
            }
          }
        } else if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32) {
          // Keys 0-9, a-z or SPACE
          e.stopPropagation();
        }
      }
    },

    // Methods
    selectedObject: function selectedObject(list, index) {
      if (list.objectAt) {
        return list.objectAt(index);
      } else {
        return (0, _emberMetalGet['default'])(list, index);
      }
    }
  });
});