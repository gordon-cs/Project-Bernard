import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";
import postAsync from "gordon360/utils/post-async";
import putAsync from "gordon360/utils/put-async";

/*  Controller for the specific activity page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    followLoad: false,
    actions: {

      // Method that closes out the current session of a given activity,
      // so that no more members can be added
      closeOutSession: function(activityCode) {
        let context = this;

        if (confirm("Are you sure you want to close out this activity for this session?")) {
          putAsync("/activities/" + activityCode + "/session/" + this.model.session.SessionCode + "/close", null, context)
          .then(function() {
            window.location.reload(true);
          });
        }
      },

      // Reopen a session that has already been closed for a specific activity
      openSession: function(activityCode) {
        let context = this;

        if (confirm("Are you sure you want to re-open this activity for this session?")) {
          putAsync("/activities/" + activityCode + "/session/" + this.model.session.SessionCode + "/open", null, context)
          .then(function() {
            window.location.reload(true);
          });
        }

      }

  }

});
