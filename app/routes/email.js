import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

/*  Route for the edit membership page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params, transition) {
        let context = this;
        let emailType = transition.queryParams.emailType;
        if (emailType == "personal" || emailType == null) {
            return transition.queryParams.emailAddress;
        }
        else {
            let activityPromise = getAsync("/activities/" + transition.queryParams.activityCode.trim(), context);
            let ActivityDescription = activityPromise.then(function(v) {
                return v.ActivityDescription;
            });
            let sessionPromise = getAsync("/sessions/" + transition.queryParams.sessionCode.trim(), context);
            let SessionDescription = sessionPromise.then(function(v) {
                return v.SessionDescription;
            });
            let model = {};
            model.ActivityDescription = ActivityDescription;
            model.SessionDescription = SessionDescription;
            return Ember.RSVP.hash(model);
        }

    }
});
