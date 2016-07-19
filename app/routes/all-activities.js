import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "test-app/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        let sessions = getSync("/sessions", this).data;
        let currentSession = getSync("/sessions/current", this).data;
        let activities = getSync("/activites", this).data;
        return {
            "activities": activities,
            "activitesShown": activities,
            "sessions": sessions,
            "currentSession": currentSession
        };
    }
});
