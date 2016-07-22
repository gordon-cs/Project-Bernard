import Ember from "ember";
import getSync from "gordon360/utils/get-sync";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        // Gets all sessions from the server and gets the one chosen by the user in the all-activities template
        selectSession: function(session) {
            let response = getSync("/activities/session/" + session.SessionCode.trim(), this);
            let activities = sortJsonArray(response.data, "ActivityDescription");
            this.set("model.activities", activities);
            this.set("model.activitiesShown", activities);
            this.set("model.activitiesFilled", (activities.length > 0));
            this.set("model.currentSession", session);
        },
        // Filters list of activities shown when user types in the search bar
        filterActivities: function() {
            let searchValue = this.get("searchValue");
            if (searchValue) {
                let newList = [];
                let oldList = this.get("model.activities");
                for (let i = 0; i < oldList.length; i ++) {
                    if (oldList[i].ActivityDescription.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    }
                }
                this.set("model.activitiesShown", newList);
            }
            else {
                this.set("model.activitiesShown", this.get("model.activities"));
            }
        }
    }
});
