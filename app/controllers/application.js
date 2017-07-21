import Ember from "ember";
import isLeader from "gordon360/utils/is-leader";
import getAsync from "gordon360/utils/get-async";
import deleteAsync from "gordon360/utils/delete-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Controller for the notification bar.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    requestsCalled: false,
    requestsRecieved: [],
    showMenu: false,
    actions: {
        toggleLogin() {
            if($("#login-outer-box").is(':visible')) {
                $("#login-outer-box").hide();
            }
            else {
                $("#login-outer-box").show();
            }
            $(".login-toggle").blur();
        },
        toggleMenu() {
            this.set("showMenu", !this.get("showMenu"));
        },
        closeMenu() {
            this.set("showMenu", false);
        },
        logout() {
            this.get("session").invalidate();
            this.set("requestsRecieved", []);
            console.log(this.get("requestsSent"));
            console.log(this.get("requestsCalled"));
            this.set("requestsSent", []);
        },
        stalkPeeps(item) {
            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            let peeps;
            if (searchValue) {
                peeps = getAsync('/accounts/search/' + searchValue, this);
                this.set('model.people', peeps);
            } else {
                this.set('model.people', "");
            }

            console.log(peeps);

        },

    },
    // Check if the user is an admin of any kind - either a group admin,
    // regular admin, or super admin
    checkAdmin() {
        let context = this;
        //let responsibilities = {}; // a variable to keep track of which activities this user is some admin for

        context.set("isSomeAdmin", false);

        let IDNumber = this.get("session.data.authenticated.token_data.id");
        let college_role = this.get('session.data.authenticated.token_data.college_role');

        // Check if the user is a regular admin
        if (college_role === "god") {
            context.set("isSomeAdmin", true);
            console.log("User is site admin");
            return;
        }

        // Check if the user is a group admin for some group
        let checkIfGroupAdmin = function() {
            let positions = [];
            return getAsync("/memberships/student/" + IDNumber, context)
                .then(function(result) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].GroupAdmin) {
                            console.log("User is a leader for: " + result[i].ActivityCode);
                            //responsibilities.push(result[i].ActivityCode);
                            context.set("isSomeAdmin", true);
                        }
                    }
                    //  context.set("responsibilities", responsibilities);
                });
        }

        checkIfGroupAdmin();

    },
    // Check if the user has readonly permission
    checkReadOnly() {
      let context = this;

      context.set("isReadOnly", false);

      let college_role = this.get('session.data.authenticated.token_data.college_role');

      console.log(college_role);

      // Check if the user is a regular admin
      if (college_role === "readonly") {
        context.set("isReadOnly", true);
        console.log("User has read only permission");
        return;
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
                        if (result[i].GroupAdmin) {
                            if (positions.indexOf(result[i].ActivityCode.trim()) === -1) {
                                positions.push(result[i].ActivityCode.trim());
                            }
                        }
                    }
                    return positions;
                });
        }

        // Get requests sent to specified activity
        let getRecievedRequests = function(result) {
            return getAsync("/requests/activity/" + result, context);
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
            }
        };

        // Get the difference in days bewteen today and specified date
        // Returns integer and printable string
        let getDiffDays = function(date) {
            let currentDate = new Date();
            let requestDate = new Date(date);
            let timeDiff = Math.abs(currentDate.getTime() - requestDate.getTime());
            let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
            let diffString;
            if (diffDays === 0) {
                diffString = "Today";
            } else if (diffDays === 1) {
                diffString = "Yesterday";
            } else {
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
                .then(function(result) {
                    for (var i = 0; i < result.length; i++) {
                        getRecievedRequests(result[i])
                            .then(addRecievedRequests);
                    }
                })
        }
    },




});