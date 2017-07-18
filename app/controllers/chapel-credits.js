import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({

    selectList: 'ALL',

    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {

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


        sortByName(item) {
            let events = this.get("model.eventShown");
            let sorted = [];

            if ($(item.target).hasClass("Event_Name")) {
                this.send('addArrow', '<span class="glyphicon glyphicon glyphicon-triangle-top" style = "color: white;" aria-hidden="true"></span>', $(item.target));
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
        displayALLEvents() {

            if (this.get('selectList') === 'ALL') {
                this.set("model.eventShown", this.get("model.allEvents"));
                this.set('selectList', 'Your');
            } else {
                this.set("model.eventShown", this.get("model.chapelEvents"));
                this.set('selectList', 'ALL');
            }
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
                $(lastForm).removeClass("onclickOrange");
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

            if ($(window).width() > 750) {
                $("#toggleEventDetailsModal").addClass("event-showModal");
                $('.container').addClass('blur');
                let context = this;
                let displayEvent = this.set("displayEvent", item);
                let chEventID = this.get("displayEvent.CHEventID", item);
            }
        },

        filterEvents: function() {
            // Filter the list of activities shown when user types in the search bar
            let searchValue = this.get("model.searchValue");
            if (searchValue) {
                let newList = [];
                let oldList = this.get("model.eventShown");
                for (let i = 0; i < oldList.length; i++) {
                    if (oldList[i].Event_Title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].Start_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].End_Time.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    } else if (oldList[i].Location.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                        newList.push(oldList[i]);
                    }

                }
                this.set("model.eventShown", newList);
            } else {
                if (this.get('selectList') === "Your") {
                    this.set("model.eventShown", this.get("model.allEvents"));
                } else if (this.get('selectList') === "ALL") {
                    this.set("model.eventShown", this.get("model.chapelEvents"));
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