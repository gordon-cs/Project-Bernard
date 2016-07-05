define('ember-basic-dropdown/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/templates/components/basic-dropdown/trigger', 'jquery', 'ember-component', 'ember-computed'], function (exports, _emberBasicDropdownTemplatesComponentsBasicDropdownTrigger, _jquery, _emberComponent, _emberComputed) {
  'use strict';

  var isTouchDevice = !!self.window && 'ontouchstart' in self.window;

  function trueStringIfPresent(path) {
    return (0, _emberComputed['default'])(path, function () {
      if (this.get(path)) {
        return 'true';
      } else {
        return null;
      }
    });
  }

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdownTrigger['default'],
    isTouchDevice: isTouchDevice,
    classNames: ['ember-basic-dropdown-trigger'],
    role: 'button',
    tabindex: 0,
    'aria-haspopup': true,
    classNameBindings: ['inPlaceClass', 'hPositionClass', 'vPositionClass'],
    attributeBindings: ['role', 'tabIndex:tabindex', 'dropdownId:aria-controls', 'ariaLabel:aria-label', 'ariaLabelledBy:aria-labelledby', 'ariaDescribedBy:aria-describedby', 'aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 'aria-pressed', 'aria-required'],

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      var dropdown = this.get('dropdown');
      this.elementId = 'ember-basic-dropdown-trigger-' + dropdown._id;
      this.dropdownId = this.dropdownId || 'ember-basic-dropdown-content-' + dropdown._id;
      this._touchMoveHandler = this._touchMoveHandler.bind(this);
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.addMandatoryHandlers();
      this.addOptionalHandlers();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this.get('appRoot').removeEventListener('touchmove', this._touchMoveHandler);
    },

    // CPs
    'aria-disabled': trueStringIfPresent('dropdown.disabled'),
    'aria-expanded': trueStringIfPresent('dropdown.isOpen'),
    'aria-invalid': trueStringIfPresent('ariaInvalid'),
    'aria-pressed': trueStringIfPresent('dropdown.isOpen'),
    'aria-required': trueStringIfPresent('ariaRequired'),

    tabIndex: (0, _emberComputed['default'])('dropdown.disabled', 'tabIndex', function () {
      return this.get('dropdown.disabled') ? -1 : this.get('tabindex') || 0;
    }),

    inPlaceClass: (0, _emberComputed['default'])('renderInPlace', function () {
      if (this.get('renderInPlace')) {
        return 'ember-basic-dropdown-trigger--in-place';
      }
    }),

    hPositionClass: (0, _emberComputed['default'])('hPosition', function () {
      var hPosition = this.get('hPosition');
      if (hPosition) {
        return 'ember-basic-dropdown-trigger--' + hPosition;
      }
    }),

    vPositionClass: (0, _emberComputed['default'])('vPosition', function () {
      var vPosition = this.get('vPosition');
      if (vPosition) {
        return 'ember-basic-dropdown-trigger--' + vPosition;
      }
    }),

    // Actions
    actions: {
      handleMousedown: function handleMousedown(e) {
        var dropdown = this.get('dropdown');
        if (e && e.defaultPrevented || dropdown.disabled) {
          return;
        }
        this.stopTextSelectionUntilMouseup();
        dropdown.actions.toggle(e);
      },

      handleTouchEnd: function handleTouchEnd(e) {
        var dropdown = this.get('dropdown');
        if (e && e.defaultPrevented || dropdown.disabled) {
          return;
        }
        if (!this.hasMoved) {
          dropdown.actions.toggle(e);
        }
        this.hasMoved = false;
      },

      handleKeydown: function handleKeydown(e) {
        var dropdown = this.get('dropdown');
        if (dropdown.disabled) {
          return;
        }
        var onKeydown = this.get('onKeydown');
        if (onKeydown && onKeydown(dropdown, e) === false) {
          return;
        }
        if (e.keyCode === 13) {
          // Enter
          dropdown.actions.toggle(e);
        } else if (e.keyCode === 32) {
          // Space
          e.preventDefault(); // prevents the space to trigger a scroll page-next
          dropdown.actions.toggle(e);
        } else if (e.keyCode === 27) {
          dropdown.actions.close(e);
        }
      }
    },

    // Methods
    _touchMoveHandler: function _touchMoveHandler() {
      this.hasMoved = true;
      this.get('appRoot').removeEventListener('touchmove', this._touchMoveHandler);
    },

    stopTextSelectionUntilMouseup: function stopTextSelectionUntilMouseup() {
      var $appRoot = (0, _jquery['default'])(this.get('appRoot'));
      var mouseupHandler = function mouseupHandler() {
        $appRoot[0].removeEventListener('mouseup', mouseupHandler, true);
        $appRoot.removeClass('ember-basic-dropdown-text-select-disabled');
      };
      $appRoot[0].addEventListener('mouseup', mouseupHandler, true);
      $appRoot.addClass('ember-basic-dropdown-text-select-disabled');
    },

    addMandatoryHandlers: function addMandatoryHandlers() {
      var _this = this;

      if (this.get('isTouchDevice')) {
        this.element.addEventListener('touchstart', function () {
          _this.get('appRoot').addEventListener('touchmove', _this._touchMoveHandler);
        });
        this.element.addEventListener('touchend', function (e) {
          _this.send('handleTouchEnd', e);
          e.preventDefault(); // Prevent synthetic click
        });
      }
      this.element.addEventListener('mousedown', function (e) {
        return _this.send('handleMousedown', e);
      });
      this.element.addEventListener('keydown', function (e) {
        return _this.send('handleKeydown', e);
      });
    },

    addOptionalHandlers: function addOptionalHandlers() {
      var dropdown = this.get('dropdown');
      var onMouseEnter = this.get('onMouseEnter');
      if (onMouseEnter) {
        this.element.addEventListener('mouseenter', function (e) {
          return onMouseEnter(dropdown, e);
        });
      }
      var onMouseLeave = this.get('onMouseLeave');
      if (onMouseLeave) {
        this.element.addEventListener('mouseleave', function (e) {
          return onMouseLeave(dropdown, e);
        });
      }
      var onFocus = this.get('onFocus');
      if (onFocus) {
        this.element.addEventListener('focus', function (e) {
          return onFocus(dropdown, e);
        });
      }
      var onBlur = this.get('onBlur');
      if (onBlur) {
        this.element.addEventListener('blur', function (e) {
          return onBlur(dropdown, e);
        });
      }
      var onFocusIn = this.get('onFocusIn');
      if (onFocusIn) {
        this.element.addEventListener('focusin', function (e) {
          return onFocusIn(dropdown, e);
        });
      }
      var onFocusOut = this.get('onFocusOut');
      if (onFocusOut) {
        this.element.addEventListener('focusout', function (e) {
          return onFocusOut(dropdown, e);
        });
      }
    }
  });
});