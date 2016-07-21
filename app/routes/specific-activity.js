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
        // If user is a leader, get all membership requests and emial list
        let requests = [];
        let emails = "";
        if (leading) {
            let allRequests = getSync("/requests/activity/" + param.ActivityCode, this).data;
            for (let i = 0; i < allRequests.length; i ++) {
                if (allRequests[i].RequestApproved === "Pending" && allRequests[i].SessionCode === param.SessionCode) {
                    requests.push(allRequests[i]);
                }
            }
            let emailArray = getSync("/emails/activity/" + param.ActivityCode + "/session/" + param.SessionCode, this).data;
            for (let i = 0; i < emailArray.length; i ++) {
                emails += emailArray[i].Email;
                if (i !== emailArray.length - 1) {
                    emails += ",";
                }
            }
        }
        //Get current memberships, of membership IDs of user, following boolean and corresponding membership ID
        let memberships = getSync("/memberships/activity/" + param.ActivityCode, this).data;
        let rosterMemberships = [];
        let allMyMembershipIDs = [];
        let membershipID;
        let following = false;
        for (var i = 0; i < memberships.length; i ++) {
            let mem = memberships[i];
            if (mem.SessionCode === param.SessionCode) {
                if (mem.IDNumber == IDNumber) {
                    allMyMembershipIDs.push(mem.MembershipID);
                    if (mem.Participation === "GUEST") {
                        membershipID = mem.MembershipID;
                        following = true;
                    }
                }
                if (mem.Participation !== "GUEST" || leading) {
                    rosterMemberships.push(mem);
                }
            }
            else {
                memberships.splice(i --, 1);
            }
        }
        return {
            // Persmissions
            "leading": leading,
            "godMode": godMode,
            // Activity
            "activity": activity,
            "session": session,
            "supervisors": allSupervisors,
            // Memberships
            "leaders": leaders,
            "memberships": memberships,
            "rosterMemberships": sortJsonArray(rosterMemberships, "LastName"),
            "leaderEmails": leaderEmails,
            "emails": emails,
            // User
            "following": following,
            "membershipID": membershipID,
            "allMyMembershipIDs": allMyMembershipIDs,
            // Misc
            "requests": sortJsonArray(requests, "LastName")
        };
    }
});
