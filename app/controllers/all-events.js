import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({

    onlyChapel: false,
    button1: 'All Event Types',
    button2: 'Future Events',
    option1: 'Show CL&W Events',
    option2: 'Include Past Events',
    showPastEvents: false,

    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),

    actions: {


        //add a up arrow or down arror to the sort buttons
        addArrow(string, item) {
            let elements = item.siblings();
            for (var i = 0; i < 3; i++) {
                $(elements[i]).find("span").remove();
            }
            if (item.is('span')) {
                item.replaceWith(string);
            } else {
                item.children('span').remove();
                item.append(string);
            }
        },

        //sort the name of the event when clicked, and add the arror
        sortByName(item) {
            let events = this.get("model.eventShown");
            let sorted = [];

            if ($(item.target).hasClass("Event_Name")) {
                //add the arror
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-top" style = "color: white;" aria-hidden="true"></span>', $(item.target));
                //sort in acending order
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
                $(item.target).removeClass("Event_Name");
            } else {
                //sort by decending then add a down arrow 
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-bottom" style = "color: white;" aria-hidden="true"></span>', $(item.target));
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
                $(item.target).addClass("Event_Name");
            }
            this.set("model.eventShown", sorted);
        },

        //same as the one above but by location
        sortByLocation(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("locationCheck")) {
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-top" style = "color: white;" aria-hidden="true"></span>', $(item.target));
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
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-bottom" style = "color: white;" aria-hidden="true"></span>', $(item.target));
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
        //same but by date
        SortByDate(item) {
            let events = this.get("model.eventShown");
            let sorted = [];
            if ($(item.target).hasClass("dateCheck")) {
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-top" style = "color: white;" aria-hidden="true"></span>', $(item.target));
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
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-bottom" style = "color: white;" aria-hidden="true"></span>', $(item.target));
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

        //if the chapel credit button is clicked only display chapel with the CL&W creddit tag
        checkForChaple() {
            if (this.get('onlyChapel') === false) {
                this.set('onlyChapel', true);
                this.set('button1', 'CL&W Events');
                this.set('option1', 'Show All Types');
                this.send('filterEvents');
            } else {
                this.set('onlyChapel', false);
                this.set('button1', 'All Event Types');
                this.set('option1', 'Show CL&W Events');
                this.send('filterEvents');
            }

        },


        //switch display to the list including past events
        showPastEvents() {
            if (this.get('showPastEvents') === false) {
                this.set('showPastEvents', true);
                this.set('button2', 'All event Dates');
                this.set('option2', 'Show Upcoming Events');
                this.send('filterEvents');
            } else {
                this.set('showPastEvents', false);
                this.set('button2', 'Future Events');
                this.set('option2', 'Include Past Events');
                this.send('filterEvents');
            }
        },


        //On mobiel, when the event name is clicked, drop down the informatio
        //and slideup the previous dropdown
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

        //search through the the event list with the given user input
        filterEvents: function() {

            let oldList = [];
            let newList = [];

            if (this.get('showPastEvents')) {
                oldList = this.get("model.allEvents");
            } else {
                oldList = this.get("model.pastEvents");
            }

            if (this.get('onlyChapel')) {
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Category_Id === '85') {
                        newList.push(oldList[i]);
                    }
                }
                oldList = newList;
                newList = [];
            }

            if (this.get("isChapel")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Chapel Office") {
                        newList.push(oldList[i]);
                    }

                }
                oldList = newList;
            }

            if (this.get("isCEC")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Campus Events Council (CEC)") {
                        newList.push(oldList[i]);
                    }

                }
                oldList = newList;

            }
            if (this.get("isArt")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Music Department" || oldList[i].Organization === "Theatre" || oldList[i].Organization === "Art Department") {
                        newList.push(oldList[i]);
                    }

                }
                oldList = newList;

            }
            if (this.get("isCalendar")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Event_Type_Name === "Calendar Announcement") {
                        newList.push(oldList[i]);
                    }

                }
                oldList = newList;

            }
            if (this.get("isAthletics")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Athletics") {
                        newList.push(oldList[i]);
                    }

                }
                oldList = newList;


            }
            if (this.get("isAdmissions")) {

                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Organization === "Admissions") {
                        newList.push(oldList[i]);
                    }

                }
                oldList = newList;
            }
            if (this.get("isCLAW")) {

                for (let i = 0; i < newList.length; i++) {
                    if (newList[i].Category_Id !== "85") {
                        newList.popObject(i);
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
                    }

                }
                this.set("model.eventShown", newList);
                //this.send("toggleCheckBox");
            } else {
                this.set("model.eventShown", oldList);
                //this.send("toggleCheckBox");
            }
        },


        //filter the list of events according to the boxes checked
        toggleCheckBox() {

            let newList = [];
            let oldList = this.get("model.allEvents");

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


        //activated by the button on mobile
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