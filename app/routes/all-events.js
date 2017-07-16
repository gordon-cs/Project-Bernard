import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {



    model: function() {

        let context = this;
        let searchValue;
        let eventList;
        let pastEvents = [];
        let monthArry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];




        let formatDiscription = function(Discription) {

            if (Discription === "" || Discription.substring(0, 4) === "<res") {
                return "No description available";
            } else {
                return Discription.replace(/&(#[0-9]+|[a-zA-Z]+);/g, " ").replace(/<\/?[^>]+(>|$)/g, " ");
            }


        }

        function setClock(startTime, endTime, startClock, endClock) {

            let startHour = new Date(startTime).getHours();
            let startMin = new Date(startTime).getMinutes();
            let endHour = new Date(endTime).getHours();
            let endMin = new Date(endTime).getMinutes();


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

            if (endMin < 10) {
                endMin = "0" + endMin;
            }

            if (endHour > 12) {
                endHour = endHour - 12;
                endClock = endHour + ":" + endMin + "pm";
            } else {
                endClock = endHour + ":" + endMin + "am";
            }

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

        function formatMultipleOccurances(Occurrences, location) {

            if (Occurrences.length > 1) {
                return "Multiple locations or dates";
            } else if (location === "") {
                return "No location available";
            } else {
                return location;
            }
        }


        let loadEvents = function() {
            return getAsync('/events/25Live/All', context);
        };

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
                eventList[i].End_Time = setClock(eventList[i].Start_Time, eventList[i].End_Time, startClock, endClock);
                eventList[i].Location = formatMultipleOccurances(eventList[i].Occurrences, eventList[i].Location);


                if (eventList[i].Event_Title === "") {
                    eventList[i].Event_Title = eventList[i].Event_Name;
                }
                eventList[i].Start_Time = monthArry[startMonth] + ". " + startDay + ", " + startYear;


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


        let loadModel = function() {
            return {
                //return all the deseired information
                "allEvents": eventList,
                "eventShown": eventList,
                "pastEvents": pastEvents,
                "searchValue": searchValue
            };

        };
        return loadEvents()
            .then(formatEvents)
            .then(loadModel);
    }

});