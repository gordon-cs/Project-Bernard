import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {



    model: function() {

        //initialize all the variables
        let context = this;
        let searchValue;
        let eventList;
        let pastEvents = [];
        let monthArry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let fullMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let sort = {
            "type": "timeObject",
            "direction": "down"
        }

        //formate the discription and get ride of all html tags
        let formatDiscription = function(Discription) {

            if (Discription === "" || Discription.substring(0, 4) === "<res") {
                return "No description available";
            } else {
                return Discription.replace(/&(#[0-9]+|[a-zA-Z]+);/g, " ").replace(/<\/?[^>]+(>|$)/g, " ");
            }

        }

        function setClock(Min, hour, clock) {
            if (Min < 10) {
                Min = "0" + Min;
            }

            if (hour === 12) {
                clock = hour + ":" + Min + "pm";
            } else if (hour > 12) {
                hour = hour - 12;
                clock = hour + ":" + Min + "pm";
            } else {
                clock = hour + ":" + Min + "am";
            }

            return clock;

        }

        //get the time of the event in clock form
        function formatClock(startTime, endTime, startClock, endClock) {

            let startHour = new Date(startTime).getHours();
            let startMin = new Date(startTime).getMinutes();
            let endHour = new Date(endTime).getHours();
            let endMin = new Date(endTime).getMinutes();


            startClock = setClock(startMin, startHour, startClock);
            endClock = setClock(endMin, endHour, endClock);

            if (startHour === 0) {
                return "All Day";
            } else {
                return startClock + " - " + endClock;
            }


        }

        function sortByTime(a, b) {
            if (a.timeObject < b.timeObject) {
                return -1;
            }
            if (a.timeObject > b.timeObject) {
                return 1;
            }
            return 0;
        }

        //handel events with multiple occurances 
        function formatMultipleOccurances(Occurrences, location) {

            if (Occurrences.length > 1) {
                return "Multiple locations or dates";
            } else if (location === "") {
                return "No location available";
            } else {
                return location;
            }
        }

        //get the info from live 25
        let loadEvents = function() {
            return getAsync('/events/25Live/All', context);
        };

        //formate all the information in the vent list ot a more readble formate
        let formatEvents = function(result) {
            console.log(result)
            eventList = result;
            let startClock;
            let endClock;

            let date = new Date();

            for (let i = 0; i < eventList.length; ++i) {

                eventList[i].Start_Time = eventList[i].Occurrences[0][0];
                eventList[i].End_Time = eventList[i].Occurrences[0][1];
                eventList[i].Location = eventList[i].Occurrences[0][2];
                eventList[i].startTimeObject = eventList[i].Start_Time;
                eventList[i].timeObject = eventList[i].End_Time;

                let startDate = new Date(eventList[i].Start_Time);
                let startYear = startDate.getFullYear();
                let startMonth = startDate.getMonth();
                let startDay = startDate.getDate();


                eventList[i].Description = formatDiscription(eventList[i].Description);
                eventList[i].End_Time = formatClock(eventList[i].Start_Time, eventList[i].End_Time, startClock, endClock);
                eventList[i].Location = formatMultipleOccurances(eventList[i].Occurrences, eventList[i].Location);


                if (eventList[i].Event_Title === "") {
                    eventList[i].Event_Title = eventList[i].Event_Name;
                }
                eventList[i].Start_Time = monthArry[startMonth] + ". " + startDay + ", " + startYear;
                eventList[i].Month = fullMonth[startMonth];

                if (startDate > date) {
                    pastEvents.push(eventList[i]);
                }

            }

            eventList.sort(sortByTime);
            pastEvents.sort(sortByTime);

            return {
                eventList,
                pastEvents,

            };


        };

        //return all important information
        let loadModel = function() {
            return {
                //return all the deseired information
                "allEvents": eventList,
                "eventShown": pastEvents,
                "pastEvents": pastEvents,
                "searchValue": searchValue,
                "sort": sort
            };

        };
        //load everything
        return loadEvents()
            .then(formatEvents)
            .then(loadModel);
    }

});