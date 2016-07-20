import Ember from "ember";
import isLeader from "gordon360/utils/is-leader";
import getSync from "gordon360/utils/get-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    notificationsPresent: false,
    requestsRecieved: null,
    requestsSent: null,
    actions: {
        logout() {
            this.get("session").invalidate();
            this.set("requests", null);
        }
    },
    // Get requests a user may have to approve or deny
    getRequests() {
        if ((this.requestsRecieved === null || this.requestsSent === null) &&
                this.get("session.data.authenticated.token_data")) {
            let date = new Date();
            // Get recieved requests
            let leaderMemberships = [];
            let requestsRecieved = [];
            let response = getSync("/memberships/student/" + this.get("session.data.authenticated.token_data.id"), this);
            if (response.success) {
                let memberships = response.data;
                for (let i = 0; i < memberships.length; i ++) {
                     if (isLeader(memberships[i].Participation)) {
                        leaderMemberships.push(memberships[i]);
                    }
                }
                for (let i = 0; i < leaderMemberships.length; i ++) {
                    // API call util function
                    let response = getSync("/requests/activity/" + leaderMemberships[i].ActivityCode, this);
                    if (response.success) {
                        for (let j = 0; j < response.data.length; j ++) {
                            if (response.data[j].Session === leaderMemberships[i].Session && response.data[j].RequestApproved === "Pending") {
                                let diffDays = this.getDiffDays(response.data[j].DateSent);
                                response.data[j].DiffDays = diffDays.diffString;
                                console.log(response.data[j]);
                                requestsRecieved.push(response.data[j]);
                            }
                        }
                    }
                }
            }
            // Get sent requests
            // Only show requests that are younger then 7 days or still pending
            let requestsSent = getSync("/requests/student/" + this.get("session.data.authenticated.token_data.id"), this).data;
            date.setDate(date.getDate() - 7);
            for (let i = 0; i < requestsSent.length; i ++) {
                let diffDays = this.getDiffDays(requestsSent[i].DateSent);
                requestsSent[i].DiffDays = diffDays.diffString;
                console.log(diffDays);
                console.log(requestsSent[i].diffDays);
                if (diffDays.diffInt > 7 && requestsSent[i].RequestApproved !== "Pending") {
                    requestsSent.splice(i, 1);
                    i --;
                }
            }
            // Set controller variables
            if (requestsRecieved.length > 0 || requestsSent.length > 0) {
                this.set("notificationsPresent", true);
            }
            if (requestsRecieved.length > 0) {
                this.set("requestsRecieved", requestsRecieved);
            }
            if (requestsSent.length > 0) {
                this.set("requestsSent", requestsSent);
            }
        }
    },
    // Get the difference between todays date and given date
    // Returns JSON object with number of days ago and string to display
    getDiffDays(date) {
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
});
