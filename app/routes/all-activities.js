import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        let sessions = getSync("/sessions", this).data;
        let reversedSessions = [];
        // Reverse the order of sessions to choose from
        for (let i = sessions.length - 1; i >= 0; i --) {
            reversedSessions.push(sessions[i]);
        }
        let currentSession = getSync("/sessions/current", this).data;
        let activities = sortJsonArray(getSync("/activities", this).data, "ActivityDescription");
        return {
            "activities": activities,
            "activitiesShown": activities,
            "activitiesFilled" : (activities.length > 0),
            "sessions": reversedSessions,
            "currentSession": currentSession
        };
    }
});
