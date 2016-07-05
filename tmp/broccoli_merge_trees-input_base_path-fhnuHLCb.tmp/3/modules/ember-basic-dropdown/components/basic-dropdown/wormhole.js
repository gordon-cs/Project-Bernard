import WormholeComponent from 'ember-wormhole/components/ember-wormhole';

export default WormholeComponent.extend({
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