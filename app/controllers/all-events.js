import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({

    onlyChapel: false,
    button1: 'All Event Types',
    button2: 'Upcoming Events',
    option1: 'Show CL&W Only',
    option2: 'Include Past Events',
    showfutureEvents: false,
    filterButton: 'Show Filters',
    eventsHeader: 'All Events',

    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),

    actions: {

        //sort the list when the sort button is selected
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



        //upon list change, changes the names of the button and the header
        //this is activated byt the switch on mobile
        chapelSwitch() {
            if (this.get('model.onlyChapel')) {
                this.set('eventsHeader', 'Christian Life & Worship Events');
                this.set('button1', 'Only CL&W Events');
                this.set('option1', 'Show All Types');
                this.send('filterEvents');
            } else {
                this.set('eventsHeader', 'All Events');
                this.set('button1', 'All Event Types');
                this.set('option1', 'Show Only CL&W Events');
                this.send('filterEvents');
            }
        },
        //if the claw credits button is clicked only display chapel with the CL&W creddit tag
        //if also switches the bool for the checkbox used for mobile, this allows the switch
        //to change even when it is not being shown. (the bool is change automatically on mobile)
        checkForChaple() {
            if (this.get('model.onlyChapel') === false) {
                this.set('model.onlyChapel', true);
                this.set('eventsHeader', 'Christian Life & Worship Events');
                this.set('button1', 'Only CL&W Events');
                this.set('option1', 'Show All Types');
                this.send('filterEvents');
            } else {
                this.set('eventsHeader', ' All Events');
                this.set('model.onlyChapel', false);
                this.set('button1', 'All Event Types');
                this.set('option1', 'Show Only CL&W Events');
                this.send('filterEvents');
            }

        },


        //switch display to the list including past events and change the name of the buttons
        showfutureEvents() {
            if (this.get('showfutureEvents') === false) {
                this.set('showfutureEvents', true);
                this.set('button2', 'All Event Dates');
                this.set('option2', 'Upcoming Events');
                this.send('filterEvents');
            } else {
                this.set('showfutureEvents', false);
                this.set('button2', 'Upcoming Events');
                this.set('option2', 'Include Past Events');
                this.send('filterEvents');
            }
        },


        //On mobiel, when the event name is clicked, drop down the information
        //and slideup the previous dropdown
        openDropDown(item) {

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

        //search through the the event list with the given user input
        filterEvents: function() {

            let oldList = [];
            let newList = [];
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

            if (this.get('showfutureEvents')) {
                oldList = this.get("model.allEvents");
            } else {
                oldList = this.get("model.futureEvents");
            }

            if (this.get("isChapel") || this.get("isArt") || this.get("isCEC") || this.get("isCalendar") || this.get("isAdmissions") ||
                this.get("isAthletics") || this.get("isCLAW") || this.get("isAcademics") || this.get("isFairORExpo") || this.get("isStudentLife")) {

                for (let i = 0; i < oldList.length; i++) {

                    if (this.get("isChapel") && oldList[i].Organization === "Chapel Office") {
                        newList.push(oldList[i]);
                    } else if (this.get("isArt") && (oldList[i].Organization === "Music Department" || oldList[i].Organization === "Theatre" || oldList[i].Organization === "Art Department")) {
                        newList.push(oldList[i]);
                    } else if (this.get("isCEC") && oldList[i].Organization === "Campus Events Council (CEC)") {
                        newList.push(oldList[i]);
                    } else if (this.get("isCalendar") && oldList[i].Event_Type_Name === "Calendar Announcement") {
                        newList.push(oldList[i]);
                    } else if (this.get("isAdmissions") && oldList[i].Organization === "Admissions") {
                        newList.push(oldList[i]);
                    } else if (this.get("isAthletics") && oldList[i].Organization === "Athletics") {
                        newList.push(oldList[i]);
                    } else if (this.get("isStudentLife") && oldList[i].Organization === "Office of Student Life") {
                        newList.push(oldList[i]);
                    } else if (this.get("isFairORExpo") && (oldList[i].Event_Type_Name === "Festival" || oldList[i].Event_Type_Name === "Exhibition" || oldList[i].Event_Type_Name === "Fair/Expo")) {
                        newList.push(oldList[i]);
                    } else if (this.get("isAcademics") && (oldList[i].Event_Type_Name === "Research Project" || oldList[i].Event_Type_Name === "Lecture/Speaker/Forum")) {
                        newList.push(oldList[i]);
                    }

                }

                oldList = newList;
                newList = [];
            }

            if (this.get('model.onlyChapel')) {

                for (let k = 0; k < oldList.length; k++) {
                    if (oldList[k].Category_Id === "85") {
                        newList.push(oldList[k]);
                    }
                }
                oldList = newList;

            }
            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            if (searchValue) {
                for (let i = 0; i < oldList.length; i++) {
                    //search through the event title
                    if (oldList[i].Event_Title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                        //search through the date
                    } else if (oldList[i].Start_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                        //search through the event times
                    } else if (oldList[i].End_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                        //search through the location
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

        //when the filter button is pushed, drop down all the filter options
        showFilters() {
            if (this.get('filterButton') === 'Show Filters') {
                this.set('filterButton', 'Hide Filters');

            } else {
                this.set('filterButton', 'Show Filters');
            }
            $('.filter-container').slideToggle();
        },


        //when the event list is clicked, display toggle for the clicked event
        toggleEventDetailsModal(item) {
            //to make sure this cant be activated by clicking on it in mobile
            if ($(window).width() > 750) {
                $("#toggleEventDetailsModal").addClass("event-showModal");
                $('.container').addClass('blur');
                let context = this;
                let displayEvent = this.set("displayEvent", item);
                this.send('modelFormate', displayEvent);
            }
        },


        //activated by the button on mobile but does the same as above
        MobileEventDetailsModal(item) {

            $("#toggleEventDetailsModal").addClass("event-showModal");
            $('.container').addClass('blur');
            let context = this;
            let displayEvent = this.set("displayEvent", item);
            this.send('modelFormate', displayEvent);
        },

        //formate the infor being displayed in the modal
        modelFormate(displayEvent) {
            if (displayEvent.Occurrences.length > 1) {
                let startClock;
                for (let i = 0; i < displayEvent.Occurrences.length; i++) {
                    let startDate = new Date(displayEvent.Occurrences[i][0]);
                    if (Object.prototype.toString.call(startDate) === '[object Date]') {
                        let startYear = startDate.getFullYear();
                        let startMonth = startDate.getMonth();
                        let startDay = startDate.getDate();
                        let startHour = startDate.getHours();
                        let startMin = startDate.getMinutes();
                        startYear = startYear.toString().substr(-2);
                        if (startMin < 10) {
                            startMin = "0" + startMin;
                        }

                        if (startHour === 12) {
                            startClock = startHour + ":" + startMin + "pm";
                        } else if (startHour > 12) {
                            startHour = startHour - 12;
                            startClock = startHour + ":" + startMin + "pm";
                        } else {
                            startClock = startHour + ":" + startMin + "am";
                        }

                        if (startHour === 0) {
                            startClock = "All Day";
                        }

                        if (displayEvent.Occurrences[i][2] === null || displayEvent.Occurrences[i][2] === "") {
                            displayEvent.Occurrences[i][3] = (startMonth + 1) + "/" + startDay + "/" + startYear + ",      " + startClock;
                        } else {
                            displayEvent.Occurrences[i][3] = (startMonth + 1) + "/" + startDay + "/" + startYear + ", " + startClock + ": " + displayEvent.Occurrences[i][2];
                        }
                    }
                }
            }
        },

        //clode the modal
        cancelEventDetailsModal(item) {

            if (!($(item.target).hasClass("modal-content") || $(item.target).hasClass("modal-body") || $(item.target).hasClass("modal-footer"))) {
                $("#toggleEventDetailsModal").removeClass("event-showModal");
                $('.container').removeClass('blur');
                $('body').css('overflow', 'scroll');
            }

        },

    },
});