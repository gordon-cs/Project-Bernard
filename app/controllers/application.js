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
        }
    },
    // Get requests a user may have to approve or deny
    getRequests() {
        if (this.requests === null) {

            let memberships = [];
            let leaderMemberships = [];
            let requests = [];

            // API call util function
            let response = getSync("/memberships/student/" + this.get("session.data.authenticated.token_data.id"));
            if (response.success) {
                memberships = response.data;
            }

            for (let i = 0; i < memberships.length; i ++) {
                 if (isLeader(memberships[i].Participation)) {
                     leaderMemberships.push(memberships[i]);
                 }
            }

            for (let i = 0; i < leaderMemberships.length; i ++) {
                // API call util function
                let response = getSync("/requests/activity/" + LeaderMemberships[i].ActivityCode);
                if (response.success) {
                    for (let j = 0; j < data.length; j ++) {
                        if (response.data[j].SessionCode === leaderMemberships[i].SessionCode && response.data[j].RequestApproved === "Pending") {
                            requests.push(response.data[j]);
                        }
                     }
                }
            }

            /* Begin old way */

            // this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
            //     var memberships = [];
            //     var leaderMemberships = [];
            //     var requests = [];
            //     Ember.$.ajax({
            //         type: "GET",
            //         url: "https://gordon360api.gordon.edu/api/memberships/student/" + this.get("session.data.authenticated.token_data.id"),
            //         async: false,
            //         headers: {
    		// 			"Authorization": headerValue
    		// 		},
            //         success: function(data) {
            //             memberships = data;
            //         }
            //     });
            //     for (var i = 0; i < memberships.length; i ++) {
            //         if (isLeader(memberships[i].Participation)) {
            //             leaderMemberships.push(memberships[i]);
            //         }
            //     }
            //     for (var i = 0; i < leaderMemberships.length; i ++) {
            //         Ember.$.ajax({
            //             type: "GET",
            //             url: "https://gordon360api.gordon.edu/api/requests/activity/" + leaderMemberships[i].ActivityCode,
            //             async: false,
            //             headers: {
        	// 				"Authorization": headerValue
        	// 			},
            //             success: function(data) {
            //                 for (var j = 0; j < data.length; j ++) {
            //                     if (data[j].SessionCode === leaderMemberships[i].SessionCode &&
            //                         data[j].RequestApproved === "Pending")
            //                     {
            //                         requests.push(data[j]);
            //                     }
            //                 }
            //             }
            //         });
            //     }
            //     if (requests.length > 0) {
            //         this.set("notificationsPresent", true);
            //     }
            //     this.set("requests", requests);
            // });

            /* end old way */
        }
    }
});
