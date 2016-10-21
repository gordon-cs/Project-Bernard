import Ember from "ember";
import isLeader from "gordon360/utils/is-leader";
import getAsync from "gordon360/utils/get-async";
import deleteAsync from "gordon360/utils/delete-async";
import sortJsonArray from "gordon360/utils/sort-json-array";

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
        deleteRequest(requestID) {
            deleteAsync("/requests/" + requestID, this)
            .then(function() {
                window.location.reload(true);
            });
        }
    }
});
