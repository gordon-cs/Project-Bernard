define('ember-basic-dropdown/components/basic-dropdown/content', ['exports', 'ember-component', 'ember-basic-dropdown/templates/components/basic-dropdown/content', 'ember-get-config', 'jquery', 'ember', 'ember-basic-dropdown/utils/computed-fallback-if-undefined', 'ember-runloop'], function (exports, _emberComponent, _emberBasicDropdownTemplatesComponentsBasicDropdownContent, _emberGetConfig, _jquery, _ember, _emberBasicDropdownUtilsComputedFallbackIfUndefined, _emberRunloop) {
  'use strict';

  var defaultDestination = _emberGetConfig['default']['ember-basic-dropdown'] && _emberGetConfig['default']['ember-basic-dropdown'].destination || 'ember-basic-dropdown-wormhole';
  var testing = _ember['default'].testing;

  var MutObserver = self.window.MutationObserver || self.window.WebKitMutationObserver;
  function waitForAnimations(element, callback) {
    var computedStyle = self.window.getComputedStyle(element);
    if (computedStyle.transitionDuration && computedStyle.transitionDuration !== '0s') {
      (function () {
        var eventCallback = function eventCallback() {
          element.removeEventListener('transitionend', eventCallback);
          callback();
        };
        element.addEventListener('transitionend', eventCallback);
      })();
    } else if (computedStyle.animationName !== 'none' && computedStyle.animationPlayState === 'running') {
      (function () {
        var eventCallback = function eventCallback() {
          element.removeEventListener('animationend', eventCallback);
          callback();
        };
        element.addEventListener('animationend', eventCallback);
      })();
    } else {
      callback();
    }
  }

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdownContent['default'],
    tagName: '',
    to: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])(testing ? 'ember-testing' : defaultDestination),
    animationEnabled: !testing,
    isTouchDevice: !!self.window && 'ontouchstart' in self.window,
    hasMoved: false,
    animationClass: '',

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      this.handleRootMouseDown = this.handleRootMouseDown.bind(this);
      this.touchStartHandler = this.touchStartHandler.bind(this);
      this.touchMoveHandler = this.touchMoveHandler.bind(this);
      var dropdown = this.get('dropdown');
      this.triggerId = 'ember-basic-dropdown-trigger-' + dropdown._id;
      this.dropdownId = 'ember-basic-dropdown-content-' + dropdown._id;
      if (this.get('animationEnabled')) {
        this.set('animationClass', 'ember-basic-dropdown--transitioning-in');
      }
      this.runloopAwareReposition = function () {
        (0, _emberRunloop.join)(dropdown.actions.reposition);
      };
    },

    // Actions
    actions: {
      didOpen: function didOpen() {
        var appRoot = this.get('appRoot');
        var dropdown = this.get('dropdown');
        this.dropdownElement = document.getElementById(this.dropdownId);
        var triggerId = this.get('triggerId');
        if (triggerId) {
          this.triggerElement = document.getElementById(this.triggerId);
        }
        appRoot.addEventListener('mousedown', this.handleRootMouseDown, true);
        if (this.get('isTouchDevice')) {
          appRoot.addEventListener('touchstart', this.touchStartHandler, true);
          appRoot.addEventListener('touchend', this.handleRootMouseDown, true);
        }

        var onFocusIn = this.get('onFocusIn');
        if (onFocusIn) {
          this.dropdownElement.addEventListener('focusin', function (e) {
            return onFocusIn(dropdown, e);
          });
        }
        var onFocusOut = this.get('onFocusOut');
        if (onFocusOut) {
          this.dropdownElement.addEventListener('focusout', function (e) {
            return onFocusOut(dropdown, e);
          });
        }

        if (!this.get('renderInPlace')) {
          this.addGlobalEvents();
        }
        dropdown.actions.reposition();
        if (this.get('animationEnabled')) {
          (0, _emberRunloop.scheduleOnce)('afterRender', this, this.animateIn);
        }
      },

      willClose: function willClose() {
        var appRoot = this.get('appRoot');
        this.removeGlobalEvents();
        appRoot.removeEventListener('mousedown', this.handleRootMouseDown, true);
        if (this.get('isTouchDevice')) {
          appRoot.removeEventListener('touchstart', this.touchStartHandler, true);
          appRoot.removeEventListener('touchend', this.handleRootMouseDown, true);
        }
        if (this.get('animationEnabled')) {
          this.animateOut(this.dropdownElement);
        }
        this.dropdownElement = this.triggerElement = null;
      }
    },

    // Methods
    handleRootMouseDown: function handleRootMouseDown(e) {
      if (this.hasMoved || this.dropdownElement.contains(e.target) || this.triggerElement && this.triggerElement.contains(e.target)) {
        this.hasMoved = false;
        return;
      }

      var closestDropdown = (0, _jquery['default'])(e.target).closest('.ember-basic-dropdown-content').get(0);
      if (closestDropdown) {
        var trigger = document.querySelector('[aria-controls=' + closestDropdown.attributes.id.value + ']');
        var parentDropdown = (0, _jquery['default'])(trigger).closest('.ember-basic-dropdown-content').get(0);
        if (parentDropdown && parentDropdown.attributes.id.value === this.dropdownId) {
          this.hasMoved = false;
          return;
        }
      }

      this.get('dropdown').actions.close(e, true);
    },

    addGlobalEvents: function addGlobalEvents() {
      var _this = this;

      self.window.addEventListener('scroll', this.runloopAwareReposition);
      self.window.addEventListener('resize', this.runloopAwareReposition);
      self.window.addEventListener('orientationchange', this.runloopAwareReposition);
      if (MutObserver) {
        this.mutationObserver = new MutObserver(function (mutations) {
          if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
            _this.runloopAwareReposition();
          }
        });
        this.mutationObserver.observe(this.dropdownElement, { childList: true, subtree: true });
      } else {
        this.dropdownElement.addEventListener('DOMNodeInserted', this.runloopAwareReposition, false);
        this.dropdownElement.addEventListener('DOMNodeRemoved', this.runloopAwareReposition, false);
      }
    },

    removeGlobalEvents: function removeGlobalEvents() {
      self.window.removeEventListener('scroll', this.runloopAwareReposition);
      self.window.removeEventListener('resize', this.runloopAwareReposition);
      self.window.removeEventListener('orientationchange', this.runloopAwareReposition);
      if (MutObserver) {
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
          this.mutationObserver = null;
        }
      } else {
        this.dropdownElement.removeEventListener('DOMNodeInserted', this.runloopAwareReposition);
        this.dropdownElement.removeEventListener('DOMNodeRemoved', this.runloopAwareReposition);
      }
    },

    animateIn: function animateIn() {
      var _this2 = this;

      waitForAnimations(this.dropdownElement, function () {
        _this2.set('animationClass', 'ember-basic-dropdown--transitioned-in');
      });
    },

    animateOut: function animateOut(dropdownElement) {
      var parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
      var clone = dropdownElement.cloneNode(true);
      clone.id = clone.id + '--clone';
      var $clone = (0, _jquery['default'])(clone);
      $clone.removeClass('ember-basic-dropdown--transitioned-in');
      $clone.removeClass('ember-basic-dropdown--transitioning-in');
      $clone.addClass('ember-basic-dropdown--transitioning-out');
      parentElement.appendChild(clone);
      this.set('animationClass', 'ember-basic-dropdown--transitioning-in');
      waitForAnimations(clone, function () {
        parentElement.removeChild(clone);
      });
    },

    touchStartHandler: function touchStartHandler() {
      this.get('appRoot').addEventListener('touchmove', this.touchMoveHandler, true);
    },

    touchMoveHandler: function touchMoveHandler() {
      this.hasMoved = true;
      this.get('appRoot').removeEventListener('touchmove', this.touchMoveHandler, true);
    }
  });
});