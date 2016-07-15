import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        var controller = this.controllerFor('transcript');
        var doc = controller.createPDF();
        var url = doc.output('dataurlstring');
        return {
            'doc': doc,
            'url': url
        };
    }
});
