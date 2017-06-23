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
        let userName = this.get("session.data.authenticated.token_data.user_name").toLowerCase(); 
        let requestsSent = [];
        let memberships = [];
        let admins = [];
        let userInfo;

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

        // Get advisor positions of user
        let getadvisorPositions = function(positions) {
            return getAsync("/memberships/student/" + IDNumber, context)
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

        let getuserInfo = function() {
            return getAsync("/profiles/" + userName + "/", context);
        };

        let setClass = function(data) {
            switch(data.Class) {
                case "1":
                    data.Class = "Freshman";
                    break;
                case "2":
                    data.Class = "Sophmore";
                    break;
                case "3":
                    data.Class = "Junior";
                    break;
                case "4":
                    data.Class = "Senior";
                    break;
                case "5":
                    data.Class = "Graduate Student";
                    break;
                case "6":
                    data.Class = "Undergraduate Conferred";
                    break;
                case "7":
                    data.Class = "Graduate Conferred";
                    break;
            }
            return data;
        }

        let setOnOffCampus = function(data){
            if(data.OnOffCampus == "on"){
                data.OnOffCampus = true;
            }else {
                data.OnOffCampus = false;
            }
            return data;
        }

        let setUserType = function(data) {
            data.IsFaculty = (data.PersonType.includes("fac"));
            data.IsAlumni = (data.PersonType.includes("alu"));
            data.IsStudent = (data.PersonType.includes("stu"));
            data.IsStudentOrAlumni = (data.IsStudent || data.isAlumni) ? true:false;
            return data
        }

        let setuserInfo = function(data) {
            userInfo = data;
        }

        let getUserActivities = function() {
            return getAsync("/memberships/student/" + IDNumber, context);
        }

        let getUserActivitiesInfo = function(data) {
            for(var i = 0; i < data.length; i++) {
                let Info = getAsync("/activities/" + data[i].ActivityCode.trim(), context);
                console.log(Info);
                data[i].activityInfo = Info;
            }
            return data;
        }
        
        let setUserActivities = function(data) {
            console.log(data);
            memberships = data;
        }

        

        let loadModel = function() {
            console.log(userInfo);
            return {
                "requestsSent": requestsSent,
                "godMode": godMode,
                "superGodMode": superGodMode,
                "admins": admins,
                "userInfo": userInfo,
                "memberships": memberships
            };
        };


        // Test setup
        let testLoadModel = function(){
            return {
                "requestsSent": [
                    {
                        "ActivityDescription": "This is a test activity",
                        "RequestApproved": "Pending",
                        "DiffDays": "12 days ago",

                    }
                ],
                "godMode": false,
                "superGodMode": false,
                "admins":[]
            }
        }

        return getLeaderPositions()
        .then(getadvisorPositions)
        .then(getSentRequests)
        .then(addSentRequests)
        .then(verifyAdmin)
        .then(getAdmins)
        .then(getuserInfo)
        .then(setClass)
        .then(setOnOffCampus)
        .then(setUserType)
        .then(setuserInfo)
        .then(getUserActivities)
        // .then(getUserActivitiesInfo)
        .then(setUserActivities)
        .then(loadModel);
        // return testLoadModel;
    }
});
