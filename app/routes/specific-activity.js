import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        let context = this;
        let id_number = this.get("session.data.authenticated.token_data.id");
        let college_role = this.get('session.data.authenticated.token_data.college_role');

        let activityPromise = getAsync("/activities/" + param.ActivityCode, context);
        let sessionPromise = getAsync("/sessions/" + param.SessionCode, context);
        let supervisorsPromise = getAsync("/supervisors/activity/" + param.ActivityCode, context);
        let activityLeadersPromise = getAsync("/memberships/activity/" + param.ActivityCode + "/leaders", context);
        let activityLeaderEmailsPromise = getAsync("/emails/activity/" + param.ActivityCode + "/leaders", context);
        let membershipsPromise = getAsync("/memberships/activity/" + param.ActivityCode, context);
        let activityRequestsPromise = getAsync("/memberships/activity/" + param.ActivityCode, context);

        // The model object the route will return.
        let theModel = {};
        // Set the god switch -- is this user an admin.
        theModel.godMode = college_role === "god";
        // If use is an admin, they have all the functionality that leaders and supervisors have.
        theModel.leading = theModel.godMode === true;

        // Supervisors and Activity leaders filtered by session code.
        // Manager = supervisor or leader
        let loadFilteredManagers = function ( model ) {
            let promiseArray = [supervisorsPromise, activityLeadersPromise];
            return Ember.RSVP.map(promiseArray, filterAccordingToCurrentSession)
            .then( function ( results ) {
                model.supervisors = Ember.RSVP.resolve(results[0]);
                model.leaders = Ember.RSVP.resolve(results[1]);
                return Ember.RSVP.hash( model );
            });
        };

        // Determine if the user is an activity leader or a supervisor
        let setIfUserIsManager = function ( model ) {
            if( model.supervisors.length > 0 )
            {
                model.hasSupervisors = true;
                for (var i = 0; i < model.supervisors.length; i++)
                {
                    if (model.supervisors[i].IDNumber == id_number)
                    {
                        model.leading = true;
                    }
                }
            }
            if (model.leaders.length > 0)
            {
                model.hasLeaders = true;

                for (var i = 0; i < model.leaders.length; i++)
                {
                    if (model.leaders[i].IDNumber == id_number)
                    {
                        model.leading = true;
                    }
                }
            }
            return Ember.RSVP.hash(model);
        };

        // Load activity requests if this user is a leader.
        let loadRequests = function ( model ) {
            if ( model.leading ) {
                return activityRequestsPromise
                .then( filterAccordingToCurrentSession )
                .then( filterRequestsToShow )
                .then( function( result ) {
                    model.requests = result;
                    model.requestsFilled = (result.length > 0);
                    return Ember.RSVP.hash(model);
                });
            }
            else{
                model.requests = [];
                return model;
            }
        };

        // Helper Function For LoadRequests
        let filterRequestsToShow = function ( requests ) {
            requests = requests.filter( function( request ) {
                return request.RequestApproved === "Pending";
            });
            return requests;
        };

        // Helper Function for LoadRquests and LoadMemberships
        let filterAccordingToCurrentSession = function ( listOfItems ) {
            listOfItems = listOfItems.filter(function( item ) {
                return item.SessionCode.trim() === param.SessionCode;
            });
            return listOfItems;
        };

        // Get the activity member emails if the user is a supervisor or activity leader
        let loadActivityMemberEmails = function ( model ) {
            if ( model.leading ) {
                let memberEmails = getAsync("/emails/activity/" + param.ActivityCode + "/session/" + param.SessionCode, context);
                return memberEmails
                .then( function ( result ) {
                    result = result.map(function( obj ) {
                        return obj.Email;
                    });
                    model.emails = result.toString();
                    return Ember.RSVP.hash( model );
                });
            }
            else {
                let emptyEmails = "";
                model.emails = "";
                return Ember.RSVP.hash( model );
            }
        };

        // Load the activity leader emails.
        let loadActivityLeaderEmails = function ( model ) {
            return activityLeaderEmailsPromise
            .then( function ( result ) {
                model.leaderEmails = result;
                return Ember.RSVP.hash( model );
            });
        };

        let loadMemberships = function ( model ) {
            return membershipsPromise
            .then( filterAccordingToCurrentSession )
            .then( function( result ) {
                model.memberships = result;
                return Ember.RSVP.hash( model );
            });
        };

        // Populate the roster that will be displayed.
        // If you are leader/supervisor, you can see Guests who have followed
        // You are activity.
        let populateRoster = function ( model ) {
            let membershipsToDisplay = [];
            for (var i = 0; i < model.memberships.length; i++) {
                if (model.memberships[i].Participation !== "GUEST" || model.leading) {
                    membershipsToDisplay.push(model.memberships[i]);
                }
            }
            model.rosterMemberships = sortJsonArray(membershipsToDisplay, "LastName");
            model.rosterFilled = (model.rosterMemberships.length > 0);
            return Ember.RSVP.hash(model);
        };

        // Determine if the user is following the activity
        let setIfFollowing = function ( model ) {
            let membershipID;
            let following = false;
            for (var i = 0; i < model.memberships.length; i++) {
                if (model.memberships[i].Participation === "GUEST") {
                    membershipID = model.memberships[i].MembershipID;
                    following = true;
                }
            }

            model.membershipID = membershipID;
            model.following = following;
            return Ember.RSVP.hash( model );
        };

        let loadSessions = function ( model ) {
            model.activity = activityPromise;
            return Ember.RSVP.hash( model );
        };

        let loadActivity = function ( model ) {
            model.session = sessionPromise;
            return Ember.RSVP.hash( model );
        };

        let loadModel = function ( model ) {
            return Ember.RSVP.hash( model );
        };

        return loadFilteredManagers( theModel )
        .then( setIfUserIsManager )
        .then( loadRequests )
        .then( loadActivityMemberEmails )
        .then( loadActivityLeaderEmails )
        .then( loadMemberships )
        .then( populateRoster )
        .then( setIfFollowing )
        .then( loadSessions )
        .then( loadActivity )
        .then( loadModel );

    }
});
