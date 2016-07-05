define('ember-basic-dropdown/components/basic-dropdown', ['exports', 'ember', 'ember-component', 'ember-computed', 'ember-metal/set', 'jquery', 'ember-basic-dropdown/templates/components/basic-dropdown', 'ember-runloop', 'ember-basic-dropdown/utils/computed-fallback-if-undefined'], function (exports, _ember, _emberComponent, _emberComputed, _emberMetalSet, _jquery, _emberBasicDropdownTemplatesComponentsBasicDropdown, _emberRunloop, _emberBasicDropdownUtilsComputedFallbackIfUndefined) {
  'use strict';

  var testing = _ember['default'].testing;
  var getOwner = _ember['default'].getOwner;

  var instancesCounter = 0;

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdown['default'],
    tagName: '',
    renderInPlace: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])(false),
    verticalPosition: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('auto'), // above | below
    horizontalPosition: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('auto'), // right | center | left
    matchTriggerWidth: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])(false),
    triggerComponent: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('basic-dropdown/trigger'),
    contentComponent: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('basic-dropdown/content'),
    classNames: ['ember-basic-dropdown'],

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      if (this.get('renderInPlace') && this.get('tagName') === '') {
        this.set('tagName', 'div');
      }
      instancesCounter++;

      this.publicAPI = {
        _id: instancesCounter++,
        isOpen: this.get('initiallyOpened') || false,
        disabled: this.get('disabled') || false,
        actions: {
          open: this.open.bind(this),
          close: this.close.bind(this),
          toggle: this.toggle.bind(this),
          reposition: this.reposition.bind(this)
        }
      };

      this.triggerId = this.triggerId || 'ember-basic-dropdown-trigger-' + this.publicAPI._id;
      this.dropdownId = this.dropdownId || 'ember-basic-dropdown-content-' + this.publicAPI._id;

      var registerAPI = this.get('registerAPI');
      if (registerAPI) {
        registerAPI(this.publicAPI);
      }
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);
      (0, _emberRunloop.cancel)(this.updatePositionsTimer);
    },

    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);
      var disabled = this.get('disabled');
      if (disabled !== this.publicAPI.disabled) {
        (0, _emberMetalSet['default'])(this.publicAPI, 'disabled', disabled);
      }
    },

    // CPs
    appRoot: (0, _emberComputed['default'])(function () {
      var rootSelector = testing ? '#ember-testing' : getOwner(this).lookup('application:main').rootElement;
      return self.document.querySelector(rootSelector);
    }),

    // Actions
    actions: {
      handleFocus: function handleFocus(e) {
        var onFocus = this.get('onFocus');
        if (onFocus) {
          onFocus(this.publicAPI, e);
        }
      }
    },

    // Methods
    open: function open(e) {
      if (this.publicAPI.disabled || this.publicAPI.isOpen) {
        return;
      }
      var onOpen = this.get('onOpen');
      if (onOpen && onOpen(this.publicAPI, e) === false) {
        return;
      }
      (0, _emberMetalSet['default'])(this.publicAPI, 'isOpen', true);
    },

    close: function close(e, skipFocus) {
      if (this.publicAPI.disabled || !this.publicAPI.isOpen) {
        return;
      }
      var onClose = this.get('onClose');
      if (onClose && onClose(this.publicAPI, e) === false) {
        return;
      }
      (0, _emberMetalSet['default'])(this.publicAPI, 'isOpen', false);
      this.setProperties({ hPosition: null, vPosition: null });
      this.previousVerticalPosition = this.previousHorizontalPosition = null;
      if (skipFocus) {
        return;
      }
      var trigger = document.getElementById(this.triggerId);
      if (trigger && trigger.tabIndex > -1) {
        trigger.focus();
      }
    },

    toggle: function toggle(e) {
      if (this.publicAPI.isOpen) {
        this.close(e);
      } else {
        this.open(e);
      }
    },

    reposition: function reposition() {
      if (!this.publicAPI.isOpen) {
        return;
      }
      var dropdownElement = self.document.getElementById(this.dropdownId);
      var triggerElement = self.document.getElementById(this.triggerId);
      if (!dropdownElement || !triggerElement) {
        return;
      }

      var renderInPlace = this.get('renderInPlace');
      if (renderInPlace) {
        this.performNaiveReposition(triggerElement, dropdownElement);
      } else {
        this.performFullReposition(triggerElement, dropdownElement);
      }
    },

    performNaiveReposition: function performNaiveReposition(trigger, dropdown) {
      var horizontalPosition = this.get('horizontalPosition');
      if (horizontalPosition === 'auto') {
        var triggerRect = trigger.getBoundingClientRect();
        var dropdownRect = dropdown.getBoundingClientRect();
        var viewportRight = (0, _jquery['default'])(self.window).scrollLeft() + self.window.innerWidth;
        horizontalPosition = triggerRect.left + dropdownRect.width > viewportRight ? 'right' : 'left';
      }
      this.applyReposition(trigger, dropdown, { horizontalPosition: horizontalPosition });
    },

    performFullReposition: function performFullReposition(trigger, dropdown) {
      var _getProperties = this.getProperties('horizontalPosition', 'verticalPosition', 'matchTriggerWidth');

      var horizontalPosition = _getProperties.horizontalPosition;
      var verticalPosition = _getProperties.verticalPosition;
      var matchTriggerWidth = _getProperties.matchTriggerWidth;

      var $window = (0, _jquery['default'])(self.window);
      var scroll = { left: $window.scrollLeft(), top: $window.scrollTop() };

      var _trigger$getBoundingClientRect = trigger.getBoundingClientRect();

      var triggerLeft = _trigger$getBoundingClientRect.left;
      var triggerTop = _trigger$getBoundingClientRect.top;
      var triggerWidth = _trigger$getBoundingClientRect.width;
      var triggerHeight = _trigger$getBoundingClientRect.height;

      var _dropdown$getBoundingClientRect = dropdown.getBoundingClientRect();

      var dropdownHeight = _dropdown$getBoundingClientRect.height;
      var dropdownWidth = _dropdown$getBoundingClientRect.width;

      var dropdownLeft = triggerLeft;
      var dropdownTop = undefined;
      dropdownWidth = matchTriggerWidth ? triggerWidth : dropdownWidth;

      if (horizontalPosition === 'auto') {
        var viewportRight = scroll.left + self.window.innerWidth;
        var roomForRight = viewportRight - triggerLeft;
        var roomForLeft = triggerLeft;
        horizontalPosition = roomForRight > roomForLeft ? 'left' : 'right';
      } else if (horizontalPosition === 'right') {
        dropdownLeft = triggerLeft + triggerWidth - dropdownWidth;
      } else if (horizontalPosition === 'center') {
        dropdownLeft = triggerLeft + (triggerWidth - dropdownWidth) / 2;
      }

      var triggerTopWithScroll = triggerTop + scroll.top;
      if (verticalPosition === 'above') {
        dropdownTop = triggerTopWithScroll - dropdownHeight;
      } else if (verticalPosition === 'below') {
        dropdownTop = triggerTopWithScroll + triggerHeight;
      } else {
        var viewportBottom = scroll.top + self.window.innerHeight;
        var enoughRoomBelow = triggerTopWithScroll + triggerHeight + dropdownHeight < viewportBottom;
        var enoughRoomAbove = triggerTop > dropdownHeight;

        if (this.previousVerticalPosition === 'below' && !enoughRoomBelow && enoughRoomAbove) {
          verticalPosition = 'above';
        } else if (this.previousVerticalPosition === 'above' && !enoughRoomAbove && enoughRoomBelow) {
          verticalPosition = 'below';
        } else if (!this.previousVerticalPosition) {
          verticalPosition = enoughRoomBelow ? 'below' : 'above';
        } else {
          verticalPosition = this.previousVerticalPosition;
        }
        dropdownTop = triggerTopWithScroll + (verticalPosition === 'below' ? triggerHeight : -dropdownHeight);
      }

      var style = { top: dropdownTop + 'px', left: dropdownLeft + 'px' };
      if (matchTriggerWidth) {
        style.width = dropdownWidth + 'px';
      }
      this.applyReposition(trigger, dropdown, { horizontalPosition: horizontalPosition, verticalPosition: verticalPosition, style: style });
    },

    applyReposition: function applyReposition(trigger, dropdown, positions) {
      this.updatePositionsTimer = (0, _emberRunloop.scheduleOnce)('actions', this, this.updatePositions, positions);
      if (positions.style) {
        Object.keys(positions.style).forEach(function (key) {
          return dropdown.style[key] = positions.style[key];
        });
      }
    },

    updatePositions: function updatePositions(positions) {
      this.setProperties({ hPosition: positions.horizontalPosition, vPosition: positions.verticalPosition });
      this.previousHorizontalPosition = positions.horizontalPosition;
      this.previousVerticalPosition = positions.verticalPosition;
    }
  });
});