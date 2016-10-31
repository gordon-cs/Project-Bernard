import Ember from "ember";
import isLeader from "gordon360/utils/is-leader";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    activate() {
        this.controllerFor("application").getRequests();
    },
    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model() {
        let college_role = this.get('session.data.authenticated.token_data.college_role');

        // Set the god switch -- is this user an admin.
        let godMode = college_role === "god";
        let superGodMode = false;

        let context = this;
        let IDNumber = this.get("session.data.authenticated.token_data.id");
        let requestsSent = [];
        let admins = [];

        let verifyAdmin = function() {
            if (godMode) {
                return getAsync("/admins/" + IDNumber, context)
                .then(function(result) {
                    if (result.SUPER_ADMIN) {
                        superGodMode = true;
                    }
                });
            }
        };

        let getAdmins = function() {
            if (superGodMode) {
                return getAsync("/admins", context)
                .then(function(result) {
                    for (var i = 0; i < result.length; i++) {
                        admins.push({
                            "ID": result[i].ADMIN_ID,
                            "Name": result[i].USER_NAME.replace(".", " "),
                            "Email": result[i].EMAIL,
                            "superAdmin": result[i].SUPER_ADMIN
                        });
                    }
                });
            }
        };

        // Get the account from email
        let getAccount = function(email) {
            return getAsync("/accounts/email/" + email + "/", context);
        };

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
        };

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

        // Get requests sent by user
        let getSentRequests = function() {
            return getAsync("/requests/student/" + IDNumber, context);
        };

        // Add sent requests to list and calculate age
        let addSentRequests = function(result) {
            for (var i = 0; i < result.length; i++) {
                let diffDays = getDiffDays(result[i].DateSent);
                result[i].DiffDays = diffDays.diffString;
                result[i].DiffDaysInt = diffDays.diffInt;
                requestsSent.push(result[i]);
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

        let loadModel = function() {
            return {
                "requestsSent": requestsSent,
                "godMode": godMode,
                "superGodMode": superGodMode,
                "admins": admins
            };
        };

        return getLeaderPositions()
        .then(getSupervisorPositions)
        .then(getSentRequests)
        .then(addSentRequests)
        .then(verifyAdmin)
        .then(getAdmins)
        .then(loadModel);
    }
});
