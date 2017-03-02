import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Controller for the what's available (all activities) page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    queryParams:['sessionCode', 'activityType'],
    sessionCode: "model.selectedSession",
    activityType: "model.selectedType",
    searchValue: "model.searchValue",
    actions: {
        // Get all sessions from the server and gets the one chosen by the user in the all-activities template

        selectSession: function(session) {
            // when a user selects a session, select all the activities for that session,
            // then update the model accordingly
            let context = this;
            let setSession = function(result) {
                let activities = sortJsonArray(result, "ActivityDescription");
                let type = context.get("model.selectedType");
                context.set("model.activities", activities);
                // If a type had already been selected, filter activities by that type
                if (type != "All") {
                  context.send("selectType", type);
                }
                else {
                  context.set("model.activitiesShown", activities);
                }
                context.set("model.activitiesFilled", (activities.length > 0));
                context.set("model.selectedSession", session);

                // set the sessionCode query param
                context.set("sessionCode", session.SessionCode);
            }
            // Get all possible types of activities for the selected session
            let getTypes = function() {
                return getAsync("/activities/session/" + session.SessionCode.trim() + "/types", context);
            }

            // Populate the activity Type dropdown power-select
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
            // If a user selects a Type in the power-select for Type, filter out
            // activities to only display that type
            this.set("model.selectedType", type);
            // set the activityType query params
            this.set("activityType", type)
            this.set("searchValue", "");

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
        filterActivities: function() {
          // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");;
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
