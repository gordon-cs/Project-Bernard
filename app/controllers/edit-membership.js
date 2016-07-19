import Ember from "ember";
import putSync from "test-app/util/put-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    //role: null,
    actions: {
        setRole(role) {
            this.set("role", role);
        },
        // Function called to update a membership
        update() {
            let comments = this.get("comments");

            // If the comments field is left blank or returned to blank keep the old comments
            if (typeof comments == "undefined" || comments.length == 0) {
              comments = this.get("model.membership.Description");
            }

            let roleID = this.get("role.ParticipationCode");

            let membershipID = this.get("model.membershipID");
            let studentID = this.get("model.membership.IDNumber");
            // Data to be sent in API call
            let data = {
              "MEMBERSHIP_ID": membershipID,
              "ACT_CDE": this.get("model.membership.ActivityCode"),
              "SESSION_CDE": this.get("model.membership.SessionCode"),
              "ID_NUM": studentID,
              "PART_LVL": roleID,
              "BEGIN_DTE": new Date().toLocaleDateString(),
              "END_DTE": new Date().toLocaleDateString(),
              "DESCRIPTION": comments
            };

            // API call to update a membership
            let response = putSync("/memberships/" + membershipID, data, this);
            if (response.success) {
                let activityCode = this.get("model.membership.ActivityCode");
                let sessionCode = this.get("model.membership.SessionCode");
                this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            } else {
                alert("Please select a position to assign.");
            }


            /* begin old way */

            // let success = false;
            // this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            //     Ember.$.ajax({
            //         type: "PUT",
            //         url: "https://gordon360api.gordon.edu/api/memberships/" + membershipID,
            //         data: JSON.stringify(data),
            //         contentType: "application/json",
            //         async: false,
            //         headers: {
            //             "Authorization": headerValue
            //         },
            //         success: function(data) {
            //             success = true;
            //         },
            //         error: function() {
            //             alert("Please select a position to assign.");
            //         }
            //     });
            // });
            // if(success) {
            //     let activityCode = this.get("model.membership.ActivityCode");
            //     let sessionCode = this.get("model.membership.SessionCode");
            //     this.transitionToRoute("/specific-activity/" + sessionCode + "/" + activityCode);
            // }

            /* end old way */
        }
    }
});
