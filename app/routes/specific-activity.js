import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

/*  Route for the specific activity page.
 *  Defines the data that is shown/can be retrieved by the page.
 *  Builds the data model that is used in the corresponding template (hbs) and controller (js) files.
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        let context = this;
        let id_number = this.get("session.data.authenticated.token_data.id");
        let college_role = this.get('session.data.authenticated.token_data.college_role');

        // Requests to be called in the beginning
        let activityPromise = getAsync("/activities/" + param.ActivityCode.trim(), context);
        let sessionPromise = getAsync("/sessions/" + param.SessionCode.trim(), context);
        let advisorsPromise = getAsync("/memberships/activity/" + param.ActivityCode.trim() + "/advisors", context);
        let activityadvisorEmailsPromise = getAsync("/emails/activity/" + param.ActivityCode.trim() + "/advisors/session/" + param.SessionCode.trim(), context);
        let activityLeadersPromise = getAsync("/memberships/activity/" + param.ActivityCode.trim() + "/leaders", context);
        let activityLeaderEmailsPromise = getAsync("/emails/activity/" + param.ActivityCode.trim() + "/leaders/session/" + param.SessionCode.trim(), context);
        let personsMembershipsPromise = getAsync("/memberships/student/" + id_number, context);
        let followingCountPromise = getAsync("/memberships/activity/" + param.ActivityCode.trim() + "/followers", context);
        let memberCountPromise = getAsync("/memberships/activity/" + param.ActivityCode.trim() + "/members", context);
        // Requests to be called if needed
        let activityRequestsPromise = function() {return getAsync("/requests/activity/" + param.ActivityCode.trim(), context);};

        // The model object the route will return.
        let theModel = {};
        // Set the god switch -- is this user an admin.
        theModel.godMode = college_role === "god";
        // If use is an admin, they have all the functionality that leaders and advisors have.
        theModel.leading = theModel.godMode === true;

        // Advisors and Activity leaders filtered by session code.
        // Manager = advisor or leader
        let loadFilteredManagers = function (model) {
            let promiseArray = [advisorsPromise, activityLeadersPromise];
            return Ember.RSVP.map(promiseArray, filterAccordingToCurrentSession)
            .then(function (results) {
                model.advisors = Ember.RSVP.resolve(results[0]);
                model.leaders = Ember.RSVP.resolve(results[1]);
                return Ember.RSVP.hash(model);
            });
        };

        // Determine if the user is an activity leader or a advisor
        let setIfUserIsManager = function (model) {
            if (model.advisors.length > 0) {
                model.hasadvisors = true;
                for (var i = 0; i < model.advisors.length; i++) {
                    if (model.advisors[i].IDNumber == id_number) {
                        model.leading = true;
                    }
                }
            }
            if (model.leaders.length > 0) {
                model.hasLeaders = true;
                for (var i = 0; i < model.leaders.length; i++) {
                    if (model.leaders[i].IDNumber == id_number) {
                        model.leading = true;
                    }
                }
            }
            return Ember.RSVP.hash(model);
        };

        // Load activity requests if this user is a leader.
        let loadRequests = function (model) {
            if (model.leading) {
                return activityRequestsPromise()
                .then(filterAccordingToCurrentSession)
                .then(filterRequestsToShow)
                .then(function(result) {
                    model.requests = result;
                    model.requestsFilled = (result.length > 0);
                    return Ember.RSVP.hash(model);
                });
            }
            else {
                model.requests = [];
                return model;
            }
        };

        // Helper Function For LoadRequests
        let filterRequestsToShow = function (requests) {
            requests = requests.filter(function(request) {
                return request.RequestApproved === "Pending";
            });
            return requests;
        };

        // Helper Function for LoadRquests and LoadMemberships
        let filterAccordingToCurrentSession = function (listOfItems) {
            listOfItems = listOfItems.filter(function(item) {
                return item.SessionCode.trim() === param.SessionCode;
            });
            return listOfItems;
        };

        // Get the activity member emails if the user is a advisor or activity leader
        let loadActivityMemberEmails = function (model) {
            if (model.leading) {
                let memberEmails = getAsync("/emails/activity/" + param.ActivityCode + "/session/" + param.SessionCode, context);
                return memberEmails
                .then(function (result) {
                    result = result.map(function(obj) {
                        return obj.Email;
                    });
                    model.emails = result.toString();
                    return Ember.RSVP.hash(model);
                });
            }
            else {
                let emptyEmails = "";
                model.emails = "";
                return Ember.RSVP.hash(model);
            }
        };

        // Load the activity leader emails.
        let loadActivityLeaderEmails = function (model) {
            return activityLeaderEmailsPromise
            .then(function (result) {
                model.leaderEmails = result;
                return Ember.RSVP.hash(model);
            });
        };

        // Load the activity advisor emails.
        let loadActivityAdvisorEmails = function (model) {
            return activityadvisorEmailsPromise
            .then(function (result) {
                model.advisorEmails = result;
                return Ember.RSVP.hash(model);
            });
        };

        let loadMemberships = function (model) {
            if (model.notAMember) {
                model.memberships = "";

                // Load number of members and followers
                followingCountPromise
                .then(function(result) {
                    model.followingCount = result;
                });
                return memberCountPromise
                .then(function(result) {
                    model.membershipCount = result;
                    return Ember.RSVP.hash(model);
                });
            }
            else {
                return getAsync("/memberships/activity/" + param.ActivityCode.trim(), context)
                .then(filterAccordingToCurrentSession)
                .then(function(result) {
                    model.memberships = result;
                    return Ember.RSVP.hash(model);
                });
            }
        };

        let setRole = function(model) {
            return personsMembershipsPromise
            .then(function(result) {
                model.notAMember = true;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].Participation === "GUEST" &&
                        result[i].SessionCode == param.SessionCode &&
                        result[i].ActivityCode == param.ActivityCode) {
                        model.membershipID = result[i].MembershipID;
                        model.following = true;
                    }
                    else if (result[i].SessionCode == param.SessionCode &&
                        result[i].ActivityCode == param.ActivityCode) {
                        model.notAMember = false;
                    }
                }
                return Ember.RSVP.hash(model);
            });
        };

        // Populate the roster that will be displayed.
        // If you are leader/advisor, you can see Guests who have followed
        // You are activity.
        let populateRoster = function (model) {
            let membershipsToDisplay = [];
            for (var i = 0; i < model.memberships.length; i++) {
                if (model.memberships[i].IDNumber == id_number) {
                    model.memberships[i].isLoggedInUser = true;
                }
                if (model.memberships[i].Participation !== "GUEST" || model.leading) {
                    membershipsToDisplay.push(model.memberships[i]);
                }
            }
            model.rosterMemberships = sortJsonArray(membershipsToDisplay, "LastName");
            model.rosterFilled = (model.rosterMemberships.length > 0);
            return Ember.RSVP.hash(model);
        };

        // Calculate number of guest memberships and regular memberships.
        // Remove duplicates from counters.
        let calculateMemberships = function (model) {
            let guestCounter = 0;
            let membershipCounter = 0;
            let guestSingular = false;
            let membershipSingular = false;
            let uniqueMemberships = [];
            let uniqueGuests = [];

            // Loop through all memberships
            for (var i = 0; i < model.memberships.length; i++) {
                let first = model.memberships[i].FirstName;
                let last = model.memberships[i].LastName;
                let name = first + " " + last;
                // If the memberships is a guest
                if (model.memberships[i].Participation === "GUEST") {
                    // Remove any duplications
                    if (uniqueGuests.indexOf(name) === -1) {
                        guestCounter++;
                        uniqueGuests.push(name);
                    }
                }
                // If the membership is not a guest - remove any duplications
                else if (uniqueMemberships.indexOf(name) === -1) {
                    membershipCounter++;
                    uniqueMemberships.push(name);
                }

            }

            if (! model.notAMember) {
                model.followingCount = guestCounter;
                model.membershipCount = membershipCounter;
            }

            // Checks the plurality of guest memberships
            if (guestCounter === 1 || guestCounter === 0) {
                guestSingular = true;
            }

            // Checks the plurality of normal memberships
            if (membershipCounter === 1 || membershipCounter === 0) {
                membershipSingular = true;
            }

            model.guestSingular = guestSingular;
            model.membershipSingular = membershipSingular;
            model.guestCounter = guestCounter;
            model.membershipCounter = membershipCounter;
            return Ember.RSVP.hash(model);
        };

        let loadSessions = function (model) {
            model.activity = activityPromise;
            return Ember.RSVP.hash(model);
        };

        let loadActivity = function (model) {
            model.session = sessionPromise;
            return Ember.RSVP.hash(model);
        };

        let loadModel = function (model) {
            return Ember.RSVP.hash(model);
        };

        return loadFilteredManagers(theModel)
        .then(setIfUserIsManager)
        .then(loadRequests)
        .then(loadActivityLeaderEmails)
        .then(loadActivityAdvisorEmails)
        .then(setRole)
        .then(loadActivityMemberEmails)
        .then(loadMemberships)
        .then(calculateMemberships)
        .then(populateRoster)
        .then(loadSessions)
        .then(loadActivity)
        .then(loadModel);

    }
});
