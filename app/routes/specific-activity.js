import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    /*  Below is the model and calls to the api that retrieve data to fill the model */
    model(param) {
        let activity = getSync("/activities/" + param.ActivityCode, this).data;
        let session = getSync("/sessions/" + param.SessionCode, this).data;
        // Get leaders for session and check if user is a leader or admin
        let allLeader = getSync("/memberships/" + param.ActivityCode + "/leaders", this).data;
        let leader = [];
        let leading = this.get('session.data.authenticated.token_data.college_role') === "god";
        for (let i = 0; i < allLeaders.length; i ++) {
            if (allLeaders[i].SessionCode === param.SessionCode) {
                leaders.push(allLeaders[i]);
                if (data[i].IDNumber === IDNumber) {
                    model.leading = true;
                }
            }
        }
        // Get current memberships, of membership IDs of user, following boolean and corresponding membership ID
        let allMemberships = getSync("/memberships/activity/" + param.ActivityCode);
        let memberships = [];
        let allMyMembershipIDs = [];
        let membershipID;
        let following = false;
        for (let i = 0; i < allMemberships.length; i ++) {
            if (allMemberships[i].SessionCode === param.SessionCode) {
                memberships.push(data[i]);
                if (allMemberships[i].IDNumber === IDNumber) {
                    allMyMembershipIDs.push(allMemberships[i].MembershipID);
                    if (allMemberships[i].Participation === "GUEST") {
                        membershipID = allMemberships[i].MembershipID;
                        following = true;
                    }
                }
            }
        }
        // If user is a leader, get all membership requests
        let requests = [];
        if (leading) {
            let allRequests = getSync("/requests/activity/" + param.ActivityCode, this).data;
            if (allRequests[i].RequestApproved === "Pending" &&
                allRequests[i].SessionCode === param.SessionCode)
            {
                requests.push(data[i]);
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
            "allMyMembershipIDs": allMyMembershipIDs,
            "requests": requests
        };
    }
});
