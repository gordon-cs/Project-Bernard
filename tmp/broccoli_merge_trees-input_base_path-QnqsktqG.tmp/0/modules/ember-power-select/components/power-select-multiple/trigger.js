import Ember from 'ember';
import Component from 'ember-component';
import layout from '../../templates/components/power-select-multiple/trigger';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';
import service from 'ember-service/inject';
import { scheduleOnce } from 'ember-runloop';
import { assert } from 'ember-metal/utils';
import { isBlank } from 'ember-utils';
import { htmlSafe } from 'ember-string';

var testing = Ember.testing;

var ua = self.window && self.window.navigator ? self.window.navigator.userAgent : '';
var isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
var isTouchDevice = testing || !!self.window && 'ontouchstart' in self.window;

export default Component.extend({
  tagName: '',
  layout: layout,
  textMeasurer: service(),
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
  openObserver: observer('select.isOpen', function () {
    var select = this.get('select');
    if (this._lastIsOpen && !select.isOpen) {
      scheduleOnce('actions', null, select.actions.search, '');
    }
    this._lastIsOpen = select.isOpen;
  }),

  // CPs
  triggerMultipleInputStyle: computed('select.searchText.length', 'select.selected.length', function () {
    var select = this.get('select');
    select.actions.reposition();
    if (!select.selected || select.selected.length === 0) {
      return htmlSafe('width: 100%;');
    } else {
      var textWidth = 0;
      if (this.inputFont) {
        textWidth = this.get('textMeasurer').width(select.searchText, this.inputFont);
      }
      return htmlSafe('width: ' + (textWidth + 25) + 'px');
    }
  }),

  maybePlaceholder: computed('placeholder', 'select.selected.length', function () {
    if (isIE) {
      return null;
    }
    var select = this.getAttr('select');
    return !select.selected || get(select.selected, 'length') === 0 ? this.get('placeholder') || '' : '';
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
        if (isBlank(e.target.value)) {
          var lastSelection = select.selected[select.selected.length - 1];
          if (lastSelection) {
            select.actions.select(this.get('buildSelection')(lastSelection, select), e);
            if (typeof lastSelection === 'string') {
              select.actions.search(lastSelection);
            } else {
              var searchField = this.get('searchField');
              assert('`{{power-select-multiple}}` requires a `searchField` when the options are not strings to remove options using backspace', searchField);
              select.actions.search(get(lastSelection, searchField));
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
      return get(list, index);
    }
  }
});