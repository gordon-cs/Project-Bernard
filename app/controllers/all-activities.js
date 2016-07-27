import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        // Get all sessions from the server and gets the one chosen by the user in the all-activities template
        selectSession: function(session) {
            let context = this;
            let setSession = function(result) {
                let activities = sortJsonArray(result, "ActivityDescription");
                context.set("model.activities", activities);
                context.set("model.activitiesShown", activities);
                context.set("model.activitiesFilled", (activities.length > 0));
                context.set("model.currentSession", session);
            }
            getAsync("/activities/session/" + session.SessionCode.trim(), this)
            .then(setSession);
        },
        // Filter the list of activities shown when user types in the search bar
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
