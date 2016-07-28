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
    requestsCalled: false,
    requestsRecieved: [],
    requestsSent: [],
    actions: {
        logout() {
            this.get("session").invalidate();
            this.set("requestsRecieved", []);
            this.set("requestsSent", []);
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

        // Get leader positions of user
        let getLeaderPositions = function() {
            let positions = [];
            return getAsync("/memberships/student/" + IDNumber, context)
            .then(function(result) {
                for (var i = 0; i < result.length; i++) {
                    if (isLeader(result[i].Participation)) {
                        if (positions.indexOf(result[i].ActivityCode.trim()) === -1) {
                            positions.push(result[i].ActivityCode.trim());
                        }
                    }
                }
                return positions;
            });
        }

        // Get supervisor positions of user
        let getSupervisorPositions = function(positions) {
            return getAsync("/supervisors/person/" + IDNumber, context)
            .then(function(result) {
                for (var i = 0; i < result.length; i++) {
                    if (!isLeader(result[i].Participation)) {
                        if (positions.indexOf(result[i].ActivityCode.trim()) === -1) {
                            positions.push(result[i].ActivityCode.trim());
                        }
                    }
                }
                return positions;
            })
        };

        // Get requests sent to specified activity
        let getRecievedRequests = function(result) {
            return getAsync("/requests/activity/" + result, context);
        };

        // Get requests sent by user
        let getSentRequests = function() {
            return getAsync("/requests/student/" + IDNumber, context);
        };

        // Add pending recieved requests to list and calculate age
        let addRecievedRequests = function(result) {
            let requestsRecieved = [];
            for (var i = 0; i < result.length; i++) {
                let diffDays = getDiffDays(result[i].DateSent);
                result[i].DiffDays = diffDays.diffString;
                result[i].DiffDaysInt = diffDays.diffInt;
                if (result[i].RequestApproved === "Pending") {
                    requestsRecieved.push(result[i]);
                }
            }
            if (requestsRecieved.length > 0) {
                let allRequestsRecieved = context.requestsRecieved.concat(requestsRecieved);
                context.set("requestsRecieved", allRequestsRecieved);
                context.set("notificationsPresent", true);
            }
        };

        // Add sent requests to list and calculate age
        let addSentRequests = function(result) {
            let requestsSent = [];
            for (var i = 0; i < result.length; i++) {
                let diffDays = getDiffDays(result[i].DateSent);
                result[i].DiffDays = diffDays.diffString;
                result[i].DiffDaysInt = diffDays.diffInt;
                requestsSent.push(result[i]);
            }
            if (requestsSent.length > 0) {
                let allRequestsSent = context.requestsSent.concat(requestsSent);
                context.set("requestsSent", allRequestsSent);
                context.set("notificationsPresent", true);
            }
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
        };

        if (!this.requestsCalled && this.get("session.data.authenticated.token_data")) {
            this.set("requestsCalled", true);

            getLeaderPositions()
            .then(getSupervisorPositions)
            .then(function(result) {
                for (var i = 0; i < result.length; i++) {
                    getRecievedRequests(result[i])
                    .then(addRecievedRequests);
                }
            })
            getSentRequests()
            .then(addSentRequests);
        }
    },
});
