import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({

    queryParams: ['category'],
    category: null,

    hey: function() {
        console.log("hey");
        this.send('filteredArticles');
    },

    filteredArticles: Ember.computed('category', 'model', function() {
        var category = this.get('category');
        console.log("hey");

    }),

    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {

        sortByName(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("toggleclick")) {
                for (let i = 0; i < events.length; i++) {
                    sorted.push(events[events.length - 1 - i]);
                    $(item.target).removeClass("toggleclick");
                }
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
                $(item.target).addClass("toggleclick");
            }
            this.set("model.eventShown", sorted);
        },

        sortByLocation(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("toggleclick")) {
                for (let i = 0; i < events.length; i++) {
                    console.log("hi");
                    sorted.push(events[events.length - 1 - i]);
                    $(item.target).removeClass("toggleclick");
                }
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
                $(item.target).addClass("toggleclick");
            }
            this.set("model.eventShown", sorted);
        },

        SortByDate(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("toggleclick")) {
                for (let i = 0; i < events.length; i++) {
                    console.log("hi");
                    sorted.push(events[events.length - 1 - i]);
                    $(item.target).removeClass("toggleclick");
                }
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
                $(item.target).addClass("toggleclick");
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

        filterEvents: function() {
            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            if (searchValue) {
                let newList = [];
                let oldList = this.get("model.allEvents");
                console.log(oldList);
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

        filterChapel(eventsList, isChecked) {
            let newList = [];
            if (isChecked) {
                console.log(eventsList);
                for (let i = 0; i < eventsList.length; i++) {
                    if (eventsList[i].Category_Id === "85") {
                        newList.push(eventsList[i]);
                    }

                }
                this.set("model.eventShown", newList);
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

            this.send('filterChapel', oldList, "isChapel");

            if (this.get("isAthletics")) {
                console.log(oldList);
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Athletics") {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);
            }
            if (this.get("isAdmissions")) {
                console.log(oldList);
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Admissions") {
                        newList.push(oldList[i]);
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
                if (displayEvent.Locations != null) {
                    let startClock;
                    for (let i = 0; i < displayEvent.Locations.length; i++) {
                        let startDate = new Date(displayEvent.Locations[i][0]);
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

                            if (displayEvent.Locations[i][1] === null || displayEvent.Locations[i][1] === "") {
                                displayEvent.Locations[i][2] = (startMonth + 1) + "/" + startDay + "/" + startYear + ",      " + startClock;
                            } else {
                                displayEvent.Locations[i][2] = (startMonth + 1) + "/" + startDay + "/" + startYear + ", " + startClock + ": " + displayEvent.Locations[i][1];
                            }
                        }
                    }
                }

            }
        },

        MobileEventDetailsModal(item) {

            $("#toggleEventDetailsModal").addClass("event-showModal");
            $('.container').addClass('blur');
            let context = this;
            let displayEvent = this.set("displayEvent", item);
            if (displayEvent.Locations != null) {
                let startClock;
                for (let i = 0; i < displayEvent.Locations.length; i++) {
                    let startDate = new Date(displayEvent.Locations[i][0]);
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

                        if (displayEvent.Locations[i][1] === null || displayEvent.Locations[i][1] === "") {
                            displayEvent.Locations[i][2] = (startMonth + 1) + "/" + startDay + "/" + startYear + ",      " + startClock;
                        } else {
                            displayEvent.Locations[i][2] = (startMonth + 1) + "/" + startDay + "/" + startYear + ", " + startClock + ": " + displayEvent.Locations[i][1];
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