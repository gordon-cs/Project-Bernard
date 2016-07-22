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
        let leading = false;

        // If the logged in user has admin rights give them to him
        let godMode = this.get('session.data.authenticated.token_data.college_role') === "god";
        if (godMode) {
            leading = true;
        }

        // Get supervisors for activity
        let supervisors = getSync("/supervisors/activity/" + param.ActivityCode, this).data;
        for (let i = 0; i < supervisors.length; i ++) {
            if (supervisors[i].SessionCode.trim() !== param.SessionCode) {
                console.log("REMOVE");
                supervisors.splice(i --, 1);
            }
            else if (supervisors[i].IDNumber == this.get("session.data.authenticated.token_data.id")) {
                leading = true;
            }
        }

        // Get leaders for session and check if user is a leader
        let leaders = getSync("/memberships/activity/" + param.ActivityCode + "/leaders", this).data;
        console.log(leaders);
        for (var i = 0; i < leaders.length; i ++) {
            if (leaders[i].SessionCode !== param.SessionCode) {
                leaders.splice(i --, 1);
            }
            else if (leaders[i].IDNumber == IDNumber) {
                leading = true;
            }
        }

        // Get leader email information
        let leaderEmails = getSync("/emails/activity/" + param.ActivityCode + "/leaders", this).data;

        // If user is a leader, get all membership requests and emial list
        let requests = [];
        let emails = "";
        if (leading) {
            requests = getSync("/requests/activity/" + param.ActivityCode, this).data;
            for (let i = 0; i < requests.length; i ++) {
                if (requests[i].RequestApproved !== "Pending" || requests[i].SessionCode !== param.SessionCode) {
                    requests.splice(i --, 1);
                }
                else {
                    requests[i].Email = getSync("/students/" + requests[i].IDNumber, this).data.StudentEmail;
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

        // Get current memberships, membership IDs of user, wether user is following and corresponding membership ID
        let memberships = [];
        let rosterMemberships = [];
        let allMyMembershipIDs = [];
        let membershipID;
        let following = false;
        let response = getSync("/memberships/activity/" + param.ActivityCode, this);
        if (response.success) {
            memberships = response.data;
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
        }
        return {
            // Persmissions
            "leading": leading,
            "godMode": godMode,
            // Activity
            "activity": activity,
            "session": session,
            "supervisors": supervisors,
            // Memberships
            "leaders": leaders,
            "memberships": memberships,
            "rosterMemberships": sortJsonArray(rosterMemberships, "LastName"),
            "rosterFilled": (rosterMemberships.length > 0),
            "leaderEmails": leaderEmails,
            "emails": emails,
            // User
            "following": following,
            "membershipID": membershipID,
            "allMyMembershipIDs": allMyMembershipIDs,
            // Misc
            "requests": sortJsonArray(requests, "LastName"),
            "requestsFilled": (requests.length > 0)
        };
    }
});
