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

        sortByName: function() {
            console.log("sorting");
            let events = this.get("model.eventShown");
            let sorted = [];
            events = events.sort(function(a, b) { return (a.CHEventID - b.CHEventID) });
            for (let i = 0; i < events.length; i++) {
                sorted.push(events[i]);
            }
            this.set("model.eventShown", sorted);
        },
        sortByLocation(item) {
            let events = this.get("model.eventShown");
            events.sort(function(a, b) { return a.CHEventID - b.CHEventID });
            this.set("events", this.get("model.eventShown"));
        },
        SortByDate(item) {
            let events = this.get("model.eventShown");
            let eventIndexA;
            let eventIndexB;
            let sorted = [];
            let monthArry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            events.sort(function(a, b) {
                for (let i = 0; i < monthArry.length; i++) {
                    if (a.CHDate === monthArry[i]) {
                        eventIndexA = i;
                    }
                    if (a.CHDate === monthArry[i]) {
                        eventIndexB = i;
                    }

                    if (eventIndexA < eventIndexB)
                        return -1;
                    if (eventIndexA > eventIndexB)
                        return 1;
                    return 0
                }
            });
            for (let i = 0; i < events.length; i++) {
                sorted.push(events[i]);
            }
            this.set("model.eventShown", sorted);
        },
        toggleRequestSent(item) {

            let lastForm = this.get("lastForm");

            if (lastForm && $(item.target).hasClass("onclickOrange")) {
                let elements = $(lastForm).nextAll();
                for (var i = 0; i < 3; i++) {
                    if ($(window).innerWidth() < 768) {
                        $(elements[i]).slideUp();
                        console.log("twice");
                    }
                }
                let form = $(item.target);
                this.set("lastForm", form);
            } else {
                if (lastForm) {
                    $(lastForm).removeClass("onclickOrange");

                    let elements = $(lastForm).nextAll();
                    for (var i = 0; i < 3; i++) {

                        if ($(window).innerWidth() < 768) {
                            $(elements[i]).slideUp();
                            console.log("once");
                        }
                    }
                }
                let form = $(item.target);
                $(form).addClass("onclickOrange");
                let elements = $(form).nextAll();
                for (var i = 0; i < 3; i++) {
                    if ($(window).innerWidth() < 768) {
                        $(elements[i]).slideDown();
                        console.log("twice");
                    }
                }
                this.set("lastForm", form);
            }
        },

        toggleEventDetailsModal(item) {

            $("#toggleEventDetailsModal").addClass("event-showModal");
            $('.container').addClass('blur');
            let context = this;
            let displayEvent = this.set("displayEvent", item);
            let chEventID = this.get("displayEvent.CHEventID", item);

        },

        filterEvents: function() {
            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            if (searchValue) {
                let newList = [];
                let oldList = this.get("model.chapelEvents");
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].CHEventID.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].CHDate.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].CHDate.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].CHTime.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);
            } else {
                this.set("model.eventShown", this.get("model.chapelEvents"));
            }
        },

        cancelEventDetailsModal(item) {

            if (!($(item.target).hasClass("modal-content") || $(item.target).hasClass("modal-body") || $(item.target).hasClass("modal-footer"))) {
                $("#toggleEventDetailsModal").removeClass("event-showModal");
                $('.container').removeClass('blur');
                $('body').css('overflow', 'scroll');
            }

        },

    },
});