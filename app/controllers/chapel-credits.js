import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    button1: 'Attended Events',
    option1: 'Show Upcoming Events',
    selectList: 'ALL',
    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {

        sortItems(type) {
            let events = this.get("model.eventShown");
            let sorted = [];
            let previousSort = this.get("model.sort");

            if (type != previousSort.type || previousSort.direction === "up") {
                // sort down
                events.sort(function(a, b) {
                    if (a[type] < b[type]) {
                        return -1;
                    }
                    if (a[type] > b[type]) {
                        return 1;
                    }
                    return 0;
                });
                this.set("model.sort.direction", "down");
            } else {
                // sort up
                events.sort(function(a, b) {
                    if (a[type] < b[type]) {
                        return 1;
                    }
                    if (a[type] > b[type]) {
                        return -1;
                    }
                    return 0;
                });
                this.set("model.sort.direction", "up");
            }
            for (let i = 0; i < events.length; i++) {
                sorted.push(events[i]);
            }
            this.set("model.eventShown", sorted);
            this.set("model.sort.type", type);
        },


        switchList() {
            if (this.get('bool1')) {
                this.set('bool1', false);
                this.send('displayALLEvents');
            } else {
                this.set('bool1', true);
                this.send('displayALLEvents');
            }
        },
        //display list of all past events events
        displayALLEvents() {
            if (this.get('bool1')) {
                this.set('button1', 'Upcoming Events');
                this.set('option1', 'Show Attended Events');
                this.send('filterEvents');
            } else {
                this.set('button1', 'Attended Events');
                this.set('option1', 'Show Upcoming Events');
                this.send('filterEvents');
            }
        },

        //apply filter to event list 
        toggleRequestSent(item) {

            let lastForm = this.get("lastForm");

            if (lastForm && $(item.target).hasClass("onclickOrange")) {
                $(item.target).siblings().slideUp();
                let form = $(item.target);
                $(lastForm).removeClass("onclickOrange");
                this.set("lastForm", form);
            } else {
                if (lastForm) {
                    $(lastForm).removeClass("onclickOrange");
                    $(lastForm).siblings().slideUp();
                }
                let form = $(item.target);
                $(form).addClass("onclickOrange");
                $(form).siblings().slideDown();
                this.set("lastForm", form);
            }

        },


        //apply filter to event list  display modal
        toggleEventDetailsModal(item) {

            if ($(window).width() > 750) {
                $("#toggleEventDetailsModal").addClass("event-showModal");
                $('.container').addClass('blur');
                let context = this;
                let displayEvent = this.set("displayEvent", item);
            }
        },


        //search the events with user input
        filterEvents: function() {

            let oldList = [];
            let previousSort = this.get("model.sort.type");
            let context = this;

            let filterSort = function(events) {
                let sorted = [];
                let previousSort = context.get("model.sort");
                let type = previousSort.type;
                if (previousSort.direction === "down") {
                    // sort down
                    events.sort(function(a, b) {
                        if (a[type] < b[type]) {
                            return -1;
                        }
                        if (a[type] > b[type]) {
                            return 1;
                        }
                        return 0;
                    });
                } else {
                    // sort up
                    events.sort(function(a, b) {
                        if (a[type] < b[type]) {
                            return 1;
                        }
                        if (a[type] > b[type]) {
                            return -1;
                        }
                        return 0;
                    });
                }
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                events = sorted;
                return events;
            };

            if (this.get('bool1')) {
                oldList = this.get("model.allEvents");
            } else {
                oldList = this.get("model.chapelEvents");
            }


            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            if (searchValue) {
                let newList = [];
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Event_Title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].Start_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].End_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].Location.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].Month.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    }
                }
                let sortedList = filterSort(newList);
                this.set("model.eventShown", sortedList);
            } else {
                let sortedList = filterSort(oldList);
                this.set("model.eventShown", sortedList);
            }
        },

        //close modal
        cancelEventDetailsModal(item) {

            if (!($(item.target).hasClass("modal-content") || $(item.target).hasClass("modal-body") || $(item.target).hasClass("modal-footer"))) {
                $("#toggleEventDetailsModal").removeClass("event-showModal");
                $('.container').removeClass('blur');
                $('body').css('overflow', 'scroll');
            }

        },

    },
});