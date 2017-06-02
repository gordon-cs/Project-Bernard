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
        .then(function(result) {
            let url = result.doc.output("dataurlstring");
            return {
                "doc": result.doc,
                "url": url,
                "memberships": result.memberships,
                "leaderships": result.leaderships,
                "hasLeaderships": result.hasLeaderships,
                "hasMemberships": result.hasMemberships,
                "title": result.title
            };
        });
    }
});
