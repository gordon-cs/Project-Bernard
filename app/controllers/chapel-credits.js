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

        toggleRequestSent(item) {
            let elements = $(item.target).nextAll();
            for (var i = 0; i < 3; i++) {
                if ($(window).innerWidth() < 768) {
                    $(elements[i]).slideToggle();
                }
            }
        },

        toggleEventDetailsModal(item) {

            $("#toggleEventDetailsModal").addClass("showModal");
            $('.container').addClass('blur');
            $('body').css('overflow', 'hidden');
            let context = this;
            let displayEvent = this.set("displayEvent", item);
            let chEventID = this.get("displayEvent.CHEventID", item);

        },

        cancelEventDetailsModal(item) {

            if (!($(item.target).hasClass("modal-content") || $(item.target).hasClass("modal-body") || $(item.target).hasClass("modal-footer"))) {
                $("#toggleEventDetailsModal").removeClass("showModal");
                $('.container').removeClass('blur');
                $('body').css('overflow', 'scroll');
            }

        },

    },
});
