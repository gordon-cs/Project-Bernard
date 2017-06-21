import Ember from 'ember';

export default Ember.Component.extend({
    tabActive: 1,
    tab1: Ember.computed.equal("tabActive", 1),
    tab2: Ember.computed.equal("tabActive", 2),
    tab3: Ember.computed.equal("tabActive", 3),
    actions: {
        activate(tabNum) {
            this.set("tabActive", tabNum);
        }
    }
});
