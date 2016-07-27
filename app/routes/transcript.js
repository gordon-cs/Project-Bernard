import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        let controller = this.controllerFor("transcript");
        return controller.createPDF()
        .then(function(doc) {
            let url = doc.output("dataurlstring");
            return {
                "doc": doc,
                "url": url
            };
        });
    }
});
