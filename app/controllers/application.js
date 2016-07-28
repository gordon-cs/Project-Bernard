import Ember from "ember";
import isLeader from "gordon360/utils/is-leader";
import getAsync from "gordon360/utils/get-async";
import deleteAsync from "gordon360/utils/delete-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Controller for the notification/logout bar.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    notificationsPresent: false,
    requestsRecieved: null,
    requestsSent: null,
    actions: {
        logout() {
            this.get("session").invalidate();
            this.set("requests", null);
        },
        deleteRequest(requestID) {
            deleteAsync("/requests/" + requestID, this)
            .then(function() {
                window.location.reload(true);
            });
        }
    },
    // Get requests a user may have to approve or deny
    getRequests() {
        let context = this;
        let IDNumber = this.get("session.data.authenticated.token_data.id");

        let leaderMemberships = [];

        // Get memberships of user
        let getMemberships = function() {
            return getAsync("/memberships/student/" + IDNumber, context);
        };
        // Get requests for an activity
        let getActivityRequests = function() {
            return getAsync("/requests/activity/" + leaderMemberships[i].ActivityCode, context);
        };
        // Get the difference in days bewteen today and specified date
        // Returns integer and printable string
        let getDiffDays = function(date) {
            let currentDate = new Date();
            let requestDate = new Date(date);
            let timeDiff = Math.abs(currentDate.getTime() - requestDate.getTime());
            let diffDays =  Math.floor(timeDiff / (1000 * 3600 * 24));
            let diffString;
            if (diffDays === 0) {
                diffString = "Today";
            }
            else if (diffDays === 1) {
                diffString = "Yesterday";
            }
            else {
                diffString = diffDays.toString() + " days ago";
            }
            return {
                "diffInt": diffDays,
                "diffString": diffString
            };
        }
        // Chooses requests that pending for the session that the user is a leader of
        let setRecievedRequests = function(result) {
            let requestsRecieved = [];
            for (let i = 0; i < result.length; i ++) {
                if (result[i].RequestApproved === "Pending") {
                    for (let j = 0; j < leaderMemberships.length; j ++) {
                        if (result[i].Session === leaderMemberships[j].Session &&
                                result[i].ActivityCode === leaderMemberships[j].ActivityCode) {
                            let diffDays = getDiffDays(result[i].DateSent);
                            result[i].DiffDays = diffDays.diffString;
                            result[i].DiffDaysInt = diffDays.diffInt;
                            requestsRecieved.push(result[i]);
                        }
                    }
                }
            }
            if (requestsRecieved.length > 0) {
                context.set("requestsRecieved", sortJsonArray(requestsRecieved, "DiffDaysInt"));
                context.set("notificationsPresent", true);
            }
        };
        // Chooses requests that are newer then 7 days or still pending
        let setSentRequests = function(result) {
            let requestsSent = [];
            for (let i = 0; i < result.length; i ++) {
                let diffDays = getDiffDays(result[i].DateSent);
                result[i].DiffDays = diffDays.diffString;
                result[i].DiffDaysInt = diffDays.diffInt;
                if (diffDays.diffInt <= 7 || result[i].RequestApproved === "Pending") {
                    requestsSent.push(result[i]);
                }
            }
            if (requestsSent.length > 0) {
                context.set("requestsSent", sortJsonArray(requestsSent, "DiffDaysInt"));
                context.set("notificationsPresent", true);
            }
        };
        // Removes non-leadership postions and gets all requests for those activities
        // Gets all requests user has sent
        let getAllRequests = function(result) {
            for (let i = 0; i < result.length; i ++) {
                if (!isLeader(result[i].Participation)) {
                    result.splice(i --, 1);
                }
            }
            leaderMemberships = result;
            for (let i = 0; i < leaderMemberships.length; i ++) {
                getAsync("/requests/activity/" + leaderMemberships[i].ActivityCode, context)
                .then(setRecievedRequests);
            }
            getAsync("/requests/student/" + IDNumber, context)
            .then(setSentRequests);
        };

        if ((this.requestsRecieved === null || this.requestsSent === null) &&
                this.get("session.data.authenticated.token_data")) {
            getMemberships()
            .then(getAllRequests)
        }
    },
});
