import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

/*  Route for the edit membership page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(param) {
        let theModel = {};
        let context = this;
        let id_number = this.get("session.data.authenticated.token_data.id");
        let college_role = this.get("session.data.authenticated.token_data.college_role");
        theModel.leading = college_role === "god";

        let rolesPromise = getAsync("/participations", context);
        let membershipPromise = getAsync("/memberships/" + param.MembershipID, context);


        let loadMembership  = function (model) {
            return membershipPromise
            .then(function (result) {
                model.membership = result;
                model.currentRole = {
                  "ParticipationCode": result.Participation,
                  "ParticipationDescription": result.ParticipationDescription
                };
                model.ActivityCode = result.ActivityCode;
                return Ember.RSVP.hash(model);
            });
        };

        let loadRoles = function (model) {
            return rolesPromise
            .then(function (result) {
                model.roles = result;
                return Ember.RSVP.hash(model);
            });
        };

        let checkIfadvisor = function (model) {
            if (!model.leading) {
                return getAsync("/memberships/activity/" + model.ActivityCode + "/advisors", context)
                .then(isIDInList)
                .then(function (bool) {
                    model.leading = bool;
                    return Ember.RSVP.hash(model);
                });
            }
            return model
        };

        let checkIfActivityLeader = function (model) {
            if (!model.leading) {
                return getAsync("/memberships/activity/" + model.ActivityCode + "/leaders", context)
                .then(isIDInList)
                .then(function (bool) {
                    model.leading = bool;
                    return Ember.RSVP.hash(model);
                });
            }
            return Ember.RSVP.hash(model) ;
        };

        let redirectIfNeither = function (model) {
            if (!model.leading) {
                context.transitionTo("index");
            }
            else {
                return Ember.RSVP.hash(model);
            }
        };

        // Helper function
        let isIDInList = function (result) {
            for (let i = 0; i < result.length; i++)
            {
                if (result[i].IDNumber == id_number) {
                    return true;
                }
            }
            return false;
        };

        let loadModel = function (model) {
            return Ember.RSVP.hash(model);
        };

        return loadMembership (theModel)
        .then(loadRoles)
        .then(checkIfadvisor)
        .then(checkIfActivityLeader)
        .then(redirectIfNeither)
        .then(loadModel);
    }
});
