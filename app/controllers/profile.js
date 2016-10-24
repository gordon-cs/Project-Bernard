import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {
        logout() {
            this.get("session").invalidate();
            this.set("requestsRecieved", []);
            this.set("requestsSent", []);
        },
        deleteRequest(id) {
            deleteAsync("/admins/" + id, this)
            .then(function() {
                window.location.reload(true);
            });
        }
    }
});
