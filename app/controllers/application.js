import Ember from "ember";
import { isLeader } from "test-app/helpers/is-leader"

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    requests: null,
    notificationsPresent: false,
    actions: {
        logout() {
            this.get('session').invalidate();
        },
        getRequests() {
            this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                var memberships = [];
                var leaderMemberships = [];
                var requests = [];
                Ember.$.ajax({
                    type: "GET",
                    url: "https://gordon360api.gordon.edu/api/memberships/student/" + this.get('session.data.authenticated.token_data.id'),
                    async: false,
                    headers: {
    					"Authorization": headerValue
    				},
                    success: function(data) {
                        memberships = data;
                    },
                    error: function(errorThrown) {
                        console.log(errorThrown);
                    }
                });
                for (var i = 0; i < memberships.length; i ++) {
                    if (isLeader(memberships[i].Participation)) {
                        leaderMemberships.push(memberships[i]);
                    }
                }
                for (var i = 0; i < leaderMemberships.length; i ++) {
                    console.log("https://gordon360api.gordon.edu/api/requests/" + leaderMemberships[i].ActivityCode);
                    Ember.$.ajax({
                        type: "GET",
                        url: "https://gordon360api.gordon.edu/api/requests/" + leaderMemberships[i].ActivityCode,
                        headers: {
        					"Authorization": headerValue
        				},
                        success: function(data) {
                            for (var j = 0; j < data.length; j ++) {
                                if (data[j].SessionCode === leaderMemberships[i].SessionCode) {
                                    requests.push(data[i]);
                                }
                            }
                        }
                    });
                }
                if (requests.length > 0) {
                    this.set("notificationsPresent", true);
                }
                console.log(memberships);
                console.log(leaderMemberships);
                console.log(requests);
                this.set("requests", requests);
            });
        }
    }
});
