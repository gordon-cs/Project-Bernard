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
        let activities = [];
        let activityAdmins = [];
        let admins = [];
        let links = [];
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

        // Gets user info from server
        let getuserInfo = function() {
            return getAsync("/profiles/", context);
        };

        // Changes class from the number value set in the table to the corresponding string
        let setClass = function(data) {
            if(data.IsStudent){
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
                    default:
                        data.Class = "Student";
                }
            }
            
            return data;
        }

        // Set whether student is on or off campus 
        // TODO will need to be changed if live data is in different format
        let setOnOffCampus = function(data){
            if(data.OnOffCampus == "on"){
                data.OnOffCampus = true;
            }else {
                data.OnOffCampus = false;
            }
            return data;
        }

        // Adds data to model to determine the type of user
        let setUserType = function(data) {
            data.IsFaculty = (data.PersonType.includes("fac"));
            data.IsAlumni = (data.PersonType.includes("alu"));
            data.IsStudent = (data.PersonType.includes("stu"));
            data.IsStudentOrAlumni = (data.IsStudent || data.isAlumni) ? true:false;
            return data
        }

        // Sets userInfo to be the edited data about the person
        let setuserInfo = function(data) {
            userInfo = data;
        }

        // Gets the users profile picture, It is a base64 string
        let getUserProfilePicture = function() {
            return getAsync("/profiles/image/", context);
        }

        // Converts the base64 to a blobl and stores it in a URL to be used by the handlebars file.
        let setUserProfilePicture = function(content ) {
            var blob = base64ToBlob(content , {type: 'image/jpeg'});
            URL = window.URL || window.webkitURL;
            var blobUrl = URL.createObjectURL(blob);
            console.log(blobUrl);
            userInfo.imageURL = blobUrl;
        }

        let base64ToBlob = function(base64) {
            var binary = atob(base64);
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            return new Blob([view], {type: 'image/jpeg'});
        };

       let dataURItoBlob =  function (dataURI) {
                // convert base64/URLEncoded data component to raw binary data held in a string
                var byteString;
                console.log(dataURI);
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type:mimeString});
            }

        // Gets all the activities a user is a member of
        let getUserMemberships = function() {
            return getAsync("/memberships/student/" + IDNumber, context);
        }

        let setUserMemberships = function(data) {
            memberships = data;
            return data;
        }

        // Gets more information about the activites that a user is a member of
        let getUserActivitiesInfo = function(data) {
            for(var i = 0; i < data.length; i++) {
                activities.push(getAsync("/activities/" + data[i].ActivityCode.trim(), context));
            }
            return activities;

        }

        //Allows mulitple promises to be executed
        let prepareInfo = function(data) {
            return Promise.all(data);
        }

        // Sets memberships to be the information about all of a users activities
        let addActivitiesInfo = function(data) {
            for(var i = 0; i < data.length; i++) {
                if (data[i].Privacy) {
                    memberships[i].Privacy = true;
                }
                memberships[i].clubInfo = data[i];
            }
            return memberships;
        }

        //Gets the contact information for every club a student is a part of
        let getActivityAdmins = function(data) {
            for(var i = 0; i < data.length; i++) {
                activityAdmins.push(getAsync("/emails/activity/" + data[i].ActivityCode.trim() + "/group-admin/session/" + data[i].SessionCode.trim(), context));
            }
            return activityAdmins;
        };

        // Adds the admins contact information to each of the users memberships
        let addActivityAdmins = function(data) {
            for(var i = 0; i < data.length; i++) {
                memberships[i].groupAdminsEmail = data[i];
            }
            return memberships;
        }

        //Turn Memberships into ember objects so that they have listeners
        let loadMemberships = function(data) {
            var membership = Ember.Object.extend({
                init: function() {
                    this._super();
                }
            });
            for(var i = 0; i < data.length; i++){
                //Create session variable that is the session without "Academic Year" if that is part of the session description
                if(data[i].SessionDescription.indexOf("Academic") > 0){
                    data[i].session = data[i].SessionDescription.slice(0, data[i].SessionDescription.indexOf(" Academic"));
                }
                memberships[i] = membership.create(data[i]);
            }
        }   

        // sets social media links to seperate array of ember objects that defines the type of the link along with the link
        let loadLinks = function() {
            var Link = Ember.Object.extend({
                linkPrefixes: ["https://www.facebook.com/", "https://twitter.com/","https://www.linkedin.com/in/","https://www.instagram.com/"],
                init: function() {
                    this._super();
                }
            });
            links = [
                Link.create({
                    "type": "Facebook",
                    "link": userInfo.Facebook,
                    "prefixNum": 0
                }),
                Link.create({
                    "type": "Twitter",
                    "link": userInfo.Twitter,
                    "prefixNum": 1
                }),
                Link.create({
                    "type": "LinkedIn",
                    "link": userInfo.LinkedIn,
                    "prefixNum": 2
                }),
                Link.create({
                    "type": "Instagram",
                    "link": userInfo.Instagram,
                    "prefixNum": 3
                })
             ];
            //  userInfo.LinkedIn = decodeURIComponent(userInfo.LinkedIn);
        }   

        // Convert US phone numbers to a readable format
        let formatPhoneNumbers = function() {
            var mobilePhone = userInfo.MobilePhone;
            var homePhone = userInfo.HomePhone;
            if(mobilePhone.length === 10){
                userInfo.formattedMobilePhone = "(" + mobilePhone.slice(0, 3) + ") " + mobilePhone.slice(3, 6) + "-" + mobilePhone.slice(6);
            }
            if(homePhone.length ===10) {
                userInfo.formattedHomePhone = "(" + homePhone.slice(0,3) + ") " + homePhone.slice(3, 6) + "-" + homePhone.slice(6);
            }
        }
 

        let loadModel = function() {
            console.log(userInfo);
            console.log(links);
            console.log(memberships);
            return {
                "requestsSent": requestsSent,
                "godMode": godMode,
                "superGodMode": superGodMode,
                "admins": admins,
                "userInfo": userInfo,
                "memberships": memberships,
                "links" : links
            };
        };



        return getLeaderPositions()
        .then(getadvisorPositions)
        .then(getSentRequests)
        .then(addSentRequests)
        .then(verifyAdmin)
        .then(getAdmins)
        .then(getuserInfo)
        .then(setUserType)
        .then(setOnOffCampus)
        .then(setClass)
        .then(setuserInfo)
        .then(getUserProfilePicture)
        .then(setUserProfilePicture)
        .then(getUserMemberships)
        .then(setUserMemberships)
        .then(getUserActivitiesInfo)
        .then(prepareInfo)
        .then(addActivitiesInfo)
        .then(getActivityAdmins)
        .then(prepareInfo)
        .then(addActivityAdmins)
        .then(loadMemberships)
        .then(loadLinks)
        .then(formatPhoneNumbers)
        .then(loadModel);
    }
});
