define('ember-basic-dropdown/components/basic-dropdown/wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  'use strict';

  exports['default'] = _emberWormholeComponentsEmberWormhole['default'].extend({
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var didInsert = this.getAttr('didInsert');
      if (didInsert) {
        didInsert();
      }
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      var willRemove = this.getAttr('willRemove');
      if (willRemove) {
        willRemove();
      }
    }
  });
});