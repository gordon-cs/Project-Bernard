import Ember from "ember";
import getSync from "gordon360/utils/get-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        // Gets all sessions from the server and gets the one chosen by the user in all-activities.hbs
        selectSession: function(session) {
            let activities = null;

            let response = getSync("/activities/session/" + session.SessionCode.trim());
            let activities = response.data;

            /* Begin old way */

            // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
            //     Ember.$.ajax({
            //         type: "GET",
            //         url: "https://gordon360api.gordon.edu/api/activities/session/" + session.SessionCode.trim(),
            //         async: false,
            //         headers: {
            //             "Authorization": headerValue
            //         },
            //         success: function(data) {
            //             activities = data;
            //         }
            //     });
            // });

            /* end old way */

            this.set("model.activities", activities);
            this.set("model.activitiesShown", activities);
            this.set("model.currentSession", session);
        },
        filterActivities: function() {
            var searchValue = this.get("searchValue");
            var newList = [];
            var oldList = this.get("model.activities");
            for (var i = 0; i < oldList.length; i ++) {
                if (oldList[i].ActivityDescription.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                    newList.push(oldList[i]);
                }
            }
            this.set("model.activitiesShown", newList);
        }
    }
});
