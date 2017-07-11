import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params, transition) {

        let context = this;
        let searchValue;
        let eventShown;
        let monthArry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let loadEvents = function() {
            return getAsync('/events/25Live/10$11$12$13$14$15$16$17$18$19$20/t', context);
        };


        let loadModel = function(result) {
            console.log(result);
            let eventList = result;
            let startClock;
            let endClock;
            let modalClock;
            let pastEvents = [];
            let date = new Date();



            for (let i = 0; i < eventList.length; ++i) {

                if (eventList[i].Description !== "No description available") {
                    eventList[i].Description = eventList[i].Description.substring(3, eventList[i].Description.length - 4);
                }
                //get the date information
                eventList[i].timeObject = eventList[i].Start_Time;
                let startDate = new Date(eventList[i].Start_Time);
                if (startDate > date) {
                    pastEvents.push(eventList[i]);
                }
                let startYear = startDate.getFullYear();
                let startMonth = startDate.getMonth();
                let startDay = startDate.getDate();
                let startHour = new Date(eventList[i].Start_Time).getHours();
                let startMin = new Date(eventList[i].Start_Time).getMinutes();

                let endHour = new Date(eventList[i].End_Time).getHours();
                let endMin = new Date(eventList[i].End_Time).getMinutes();

                //insert the formated date back into the JSON array
                eventList[i].Start_Time = monthArry[startMonth] + ". " + startDay + ", " + startYear;
                //console.log(eventMonth);


                //create a 12 hour clock
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


                if (eventList[i].Location === null && eventList[i].Locations !== null) {
                    eventList[i].Location = "Multiple locations or dates";
                    eventList[i].End_Time = "---";
                    eventList[i].Start_Time = "---";
                } else if (startHour === 0) {
                    eventList[i].End_Time = "All Day";
                } else {
                    eventList[i].End_Time = startClock + " - " + endClock;
                }
                if (eventList[i].Location === null && eventList[i].Locations === null) {
                    eventList[i].Location = "No location available";

                }

            }


            return {
                //return all the deseired information
                "allEvents": eventList,
                "eventShown": pastEvents,
                "pastEvents": pastEvents,
                "searchValue": searchValue
            };
        };
        return loadEvents()
            .then(loadModel)
    }

});