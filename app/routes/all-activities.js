import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        let sessions = getSync("/sessions", this).data;
        let reversedSessions = [];
        for (let i = sessions.length - 1; i >= 0; i --) {
            reversedSessions.push(sessions[i]);
        }
        let currentSession = getSync("/sessions/current", this).data;
        let activities = getSync("/activities", this).data;
        return {
            "activities": activities,
            "activitiesShown": activities,
            "sessions": reversedSessions,
            "currentSession": currentSession
        };
    }
});
