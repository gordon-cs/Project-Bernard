import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

/*  Route for the transcript page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
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
