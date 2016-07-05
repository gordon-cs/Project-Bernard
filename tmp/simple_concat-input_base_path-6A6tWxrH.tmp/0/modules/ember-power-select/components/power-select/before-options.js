import Component from 'ember-component';
import { scheduleOnce } from 'ember-runloop';
import layout from '../../templates/components/power-select/before-options';

export default Component.extend({
  tagName: '',
  layout: layout,

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
      scheduleOnce('afterRender', this.input, 'focus');
    }
  }
});