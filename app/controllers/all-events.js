import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({

    buttonText: 'CL&W',
    buttonText2: 'Past Events',

    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),

    actions: {




        sortByName(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("nameCheck")) {
                events.sort(function(a, b) {
                    if (a.Event_Name < b.Event_Name) {
                        return 1;
                    }
                    if (a.Event_Name > b.Event_Name) {
                        return -1;
                    }
                    return 0;
                });
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                $(item.target).removeClass("nameCheck");
            } else {
                events.sort(function(a, b) {
                    if (a.Event_Name < b.Event_Name) {
                        return -1;
                    }
                    if (a.Event_Name > b.Event_Name) {
                        return 1;
                    }
                    return 0;
                });
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                $(item.target).addClass("nameCheck");
            }
            this.set("model.eventShown", sorted);
        },

        sortByLocation(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("locationCheck")) {
                events.sort(function(a, b) {
                    if (a.Location < b.Location) {
                        return 1;
                    }
                    if (a.Location > b.Location) {
                        return -1;
                    }
                    return 0;
                });
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                $(item.target).removeClass("locationCheck");
            } else {
                events.sort(function(a, b) {
                    if (a.Location < b.Location) {
                        return -1;
                    }
                    if (a.Location > b.Location) {
                        return 1;
                    }
                    return 0;
                });
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                $(item.target).addClass("locationCheck");
            }
            this.set("model.eventShown", sorted);
        },

        SortByDate(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("dateCheck")) {
                events.sort(function(a, b) {
                    if (a.timeObject < b.timeObject) {
                        return 1;
                    }
                    if (a.timeObject > b.timeObject) {
                        return -1;
                    }
                    return 0;
                });
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                $(item.target).removeClass("dateCheck");
            } else {
                events.sort(function(a, b) {
                    if (a.timeObject < b.timeObject) {
                        return -1;
                    }
                    if (a.timeObject > b.timeObject) {
                        return 1;
                    }
                    return 0;
                });
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[i]);
                }
                $(item.target).addClass("dateCheck");
            }
            this.set("model.eventShown", sorted);
        },

        checkForChaple() {
            let newList = [];
            let oldList = this.get("model.eventShown");
            if (this.get('buttonText') === 'CL&W') {
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Category_Id === '85') {
                        newList.push(oldList[i]);
                    }
                }
                this.set("model.eventShown", newList);
                this.set('buttonText', 'All');
            } else {
                this.set("model.eventShown", this.get("model.pastEvents"));
                this.set('buttonText', 'CL&W');
            }

        },

        showPastEvents() {

            if (this.get('buttonText2') === 'Past Events') {
                this.set("model.eventShown", this.get("model.allEvents"));
                this.set('buttonText2', 'Upoming');
            } else {
                this.set("model.eventShown", this.get("model.pastEvents"));
                this.set('buttonText2', 'Past Events');
            }
        },

        toggleRequestSent(item) {



            let lastForm = this.get("lastForm");

            if (lastForm && $(item.target).hasClass("onclickOrange")) {
                let elements = $(lastForm).nextAll();
                for (var i = 0; i < 4; i++) {
                    if ($(window).innerWidth() < 768) {
                        $(elements[i]).slideUp();
                    }
                }
                $(lastForm).removeClass("onclickOrange");
                let form = $(item.target);
                this.set("lastForm", form);
            } else {
                if (lastForm) {
                    $(lastForm).removeClass("onclickOrange");

                    let elements = $(lastForm).nextAll();
                    for (var i = 0; i < 4; i++) {

                        if ($(window).innerWidth() < 768) {
                            $(elements[i]).slideUp();

                        }
                    }
                }
                let form = $(item.target);
                $(form).addClass("onclickOrange");
                let elements = $(form).nextAll();
                for (var i = 0; i < 4; i++) {
                    if ($(window).innerWidth() < 768) {
                        $(elements[i]).slideDown();
                    }
                }
                this.set("lastForm", form);
            }
        },

        filterEvents: function() {
            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            if (searchValue) {
                let newList = [];
                let oldList = this.get("model.allEvents");

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Event_Name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].End_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].Location !== null) {
                        if (oldList[i].Location.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                            newList.push(oldList[i]);
                        }
                    } else if (oldList[i].Start_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);
            } else {
                this.set("model.eventShown", this.get("model.allEvents"));
            }
        },


        toggleCheckBox: function() {

            if (this.get("pastEvents")) {
                this.set("model.eventShown", this.get("model.allEvents"));
            } else {
                this.set("model.eventShown", this.get("model.pastEvents"));
            }

            let newList = [];
            let oldList = this.get("model.eventShown");

            if (this.get("isChapel")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Chapel Office") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);
            }

            if (this.get("isCEC")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Campus Events Council (CEC)") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);

            }
            if (this.get("isArt")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Music Department" || oldList[i].Organization === "Theatre" || oldList[i].Organization === "Art Department") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);

            }
            if (this.get("isCalendar")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Event_Type_Name === "Calendar Announcement") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);

            }
            if (this.get("isAthletics")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Athletics") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);

            }
            if (this.get("isAdmissions")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Admissions") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);
            }
            if (this.get("isCLAW")) {

                for (let i = 0; i < newList.length; i++) {
                    if (newList[i].Category_Id !== "85") {
                        newList.popObject(i);
                    }

                }
                this.set("model.eventShown", newList);
            }
        },

        toggleEventDetailsModal(item) {

            if ($(window).width() > 750) {
                $("#toggleEventDetailsModal").addClass("event-showModal");
                $('.container').addClass('blur');
                let context = this;
                let displayEvent = this.set("displayEvent", item);
                this.send('modelFormate', displayEvent);
            }
        },

        MobileEventDetailsModal(item) {

            $("#toggleEventDetailsModal").addClass("event-showModal");
            $('.container').addClass('blur');
            let context = this;
            let displayEvent = this.set("displayEvent", item);
            console.log("displayEvent.Occurrences.length");
            this.send('modelFormate', displayEvent);


        },

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

        cancelEventDetailsModal(item) {

            if (!($(item.target).hasClass("modal-content") || $(item.target).hasClass("modal-body") || $(item.target).hasClass("modal-footer"))) {
                $("#toggleEventDetailsModal").removeClass("event-showModal");
                $('.container').removeClass('blur');
                $('body').css('overflow', 'scroll');
            }

        },

    },
});