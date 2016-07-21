import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getSync from "gordon360/utils/get-sync";
import sortJsonArray from "gordon360/utils/sort-json-array";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        let IDNumber = this.get("session.data.authenticated.token_data.id");
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        let session = getSync("/sessions/" + param.SessionCode, this).data;

        // Get leaders for session and check if user is a leader or admin
        let allLeaders = getSync("/memberships/activity/" + param.ActivityCode + "/leaders", this).data;
        let leaders = [];

        // Get supervisors for activity
        let allSupervisors = getSync("/supervisors/activity/" + param.ActivityCode, this).data;

        // Get leader email information
        let getLeaders = getSync("/emails/activity/" + param.ActivityCode + "/leaders", this).data;
        let leaderEmails = [];
        for (var i = 0; i < getLeaders.length; i++) {
            leaderEmails.push(getLeaders[i]);
        }

        // If the logged in user has admin rights give them to him
        let leading = false;
        let godMode = this.get('session.data.authenticated.token_data.college_role') === "god";
        if (godMode) {
            leading = true;
        }
        for (var i = 0; i < allLeaders.length; i ++) {
            if (allLeaders[i].SessionCode === param.SessionCode) {
                leaders.push(allLeaders[i]);
                if (allLeaders[i].IDNumber == IDNumber) {
                    leading = true;
                }
            }
        }
        //Get current memberships, of membership IDs of user, following boolean and corresponding membership ID
        let allMemberships = getSync("/memberships/activity/" + param.ActivityCode, this).data;
        let memberships = [];
        let rosterMemberships = [];
        let allMyMembershipIDs = [];
        let membershipID;
        let following = false;
        for (var i = 0; i < allMemberships.length; i ++) {
            if (allMemberships[i].SessionCode === param.SessionCode) {
                memberships.push(allMemberships[i]);
                if (allMemberships[i].IDNumber == IDNumber) {
                    allMyMembershipIDs.push(allMemberships[i].MembershipID);
                    if (allMemberships[i].Participation === "GUEST") {
                        membershipID = allMemberships[i].MembershipID;
                        following = true;
                    }
                }
                if (allMemberships[i].Participation !== "GUEST") {
                    rosterMemberships.push(allMemberships[i]);
                }
            }
        }
        // If user is a leader, get all membership requests
        let requests = [];
        if (leading) {
            let allRequests = getSync("/requests/activity/" + param.ActivityCode, this).data;
            for (let i = 0; i < allRequests.length; i ++) {
                if (allRequests[i].RequestApproved === "Pending" && allRequests[i].SessionCode === param.SessionCode) {
                    requests.push(allRequests[i]);
                }
            }
        }
        return {
            "following": following,
            "leading": leading,
            "membershipID": membershipID,
            "leaders": leaders,
            "activity": activity,
            "session": session,
            "memberships": memberships,
            "rosterMemberships": sortJsonArray(rosterMemberships, "LastName"),
            "allMyMembershipIDs": allMyMembershipIDs,
            "leaderEmails": leaderEmails,
            "godMode": godMode,
            "supervisors": allSupervisors
            "requests": sortJsonArray(requests, "LastName")
        };
    }
});
