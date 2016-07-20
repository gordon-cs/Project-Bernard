import Ember from "ember";
import isLeader from "gordon360/utils/is-leader";
import getSync from "gordon360/utils/get-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    notificationsPresent: false,
    requests: null,
    actions: {
        logout() {
            this.get("session").invalidate();
            this.set("requests", null);
        }
    },
    // Get requests a user may have to approve or deny
    getRequests() {
        if (this.requests === null && this.get("session.data.authenticated.token_data")) {
            let leaderMemberships = [];
            let requests = [];
            // API call util function
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
                                requests.push(response.data[j]);
                            }
                        }
                    }
                }
                if (requests.length > 0) {
                    this.set("notificationsPresent", true);
                    this.set("requests", requests);
                }
            }
        }
    }
});
