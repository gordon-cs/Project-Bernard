import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 *
 * Important: I am using eventsShown as the intermediate lsit of events to change, then I will reset the list
 * by settting it back to the list of chapel events attended or upcoming events.
 */
export default Ember.Controller.extend({
    button1: 'Upcoming Events',
    option1: 'Show Attended Events',
    selectList: 'ALL',
    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {

        //sort the list when the sort button is selected
        sortItems(type) {
            let events = this.get("model.eventShown");
            let sorted = [];
            let previousSort = this.get("model.sort");
            events.forEach(function(item, index) {
                item["idx"] = index;
            });

            if (type != previousSort.type || previousSort.direction === "up") {
                // sort down
                events.sort(function(a, b) {
                    if (a[type] < b[type]) {
                        return -1;
                    }
                    if (a[type] > b[type]) {
                        return 1;
                    }
                    if (a["idx"] < b["idx"]) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                this.set("model.sort.direction", "down");
            } else {
                // sort up
                events.sort(function(a, b) {
                    let aIndex = events.indexOf(a);
                    let bIndex = events.indexOf(b);
                    if (a[type] < b[type]) {
                        return 1;
                    }
                    if (a[type] > b[type]) {
                        return -1;
                    }
                    if (a["idx"] < b["idx"]) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                this.set("model.sort.direction", "up");
            }
            for (let i = 0; i < events.length; i++) {
                sorted.push(events[i]);
            }
            this.set("model.eventShown", sorted);
            this.set("model.sort.type", type);
        },

        //change the button names when this action is called
        switchList() {
            if (this.get('model.bool1')) {
                this.set('model.bool1', false);
                this.send('displayALLEvents');
            } else {
                this.set('model.bool1', true);
                this.send('displayALLEvents');
            }
        },
        //display list of all past events events
        displayALLEvents() {
            if (this.get('model.bool1')) {
                this.set('button1', 'Upcoming Events');
                this.set('option1', 'Show Attended Events');
                this.send('filterEvents');
            } else {
                this.set('button1', 'Attended Events');
                this.set('option1', 'Show Upcoming Events');
                this.send('filterEvents');
            }
        },

        //dropdown information on the mobile display and applys a color change
        toggleRequestSent(item) {

            let lastForm = this.get("lastForm");

            if (lastForm && $(item.target).hasClass("onclickGreen")) {
                $(item.target).siblings().slideUp();
                let form = $(item.target);
                $(lastForm).removeClass("onclickGreen");
                this.set("lastForm", form);
            } else {
                if (lastForm) {
                    $(lastForm).removeClass("onclickGreen");
                    $(lastForm).siblings().slideUp();
                }
                let form = $(item.target);
                $(form).addClass("onclickGreen");
                $(form).siblings().slideDown();
                this.set("lastForm", form);
            }

        },


        //displays the modal when clicked
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

            //sort function activated after each filter
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

            if (this.get('model.bool1')) {
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