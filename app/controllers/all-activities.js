import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Controller for the what's available (all activities) page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
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
            let getTypes = function() {
                return getAsync("/activities/session/" + session.SessionCode.trim() + "/types", context);
            }
            let setTypes = function(result) {
                let types = result;
                types.push("All");
                types = types.sort();
                context.set("model.activityTypes", types);
            }
            getAsync("/activities/session/" + session.SessionCode.trim(), this)
            .then(setSession)
            .then(getTypes)
            .then(setTypes);
        },
        selectType: function(type) {
            this.set("model.selectedType", type);

            if (type && type.toLowerCase() != "All".toLowerCase()) {
                let newList = [];
                let oldList = this.get("model.activities");
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].ActivityTypeDescription.toLowerCase() == type.toLowerCase()) {
                        newList.push(oldList[i]);
                    }
                }
                this.set("model.activitiesShown", newList);
            }
            else {
                this.set("model.activitiesShown", this.get("model.activities"));
            }
        },
        // Filter the list of activities shown when user types in the search bar
        filterActivities: function() {
            let searchValue = this.get("searchValue");
            if (searchValue) {
                let newList = [];
                let oldList = this.get("model.activities");
                for (let i = 0; i < oldList.length; i++) {
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
