import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params, transition) {

        //initialize variables
        let context = this;
        let id_name = this.get("session.data.authenticated.token_data.user_name");
        let monthArry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let searchValue;
        let eventShown;
        let numEvents;
        let eventsPercent;
        let chapelEvents = [];
        let allEvents = [];


        //subtract a year if it is the spring semester,
        //take away the first two digits of the year ie. (yyyy -> yy)
        //create termcode based on month,and shorten year
        let month = new Date().getMonth();
        let date = new Date().getFullYear() - (month >= 0 && month <= 6 ? 1 : 0);
        let term = (month >= 0 && month <= 6 ? "SP" : "FA");
        let subdate = date.toString().substr(-2);
        let termCode = subdate + term;

        function sortDate(first, second) {
            if (first.CHDate === second.CHDate)
                return 0;
            if (first.CHDate < second.CHDate)
                return 1;
            else
                return -1;
        }

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


        console.log(termCode);


        //retreive the chapel information from the database
        let loadChapel = function() {
            return getAsync("/events/chapel/" + id_name + "/" + "17FA", context)
                .then(function(result) {
                    chapelEvents = result;
                    numEvents = chapelEvents.length;
                    eventsPercent = Math.round((numEvents * 100) / chapelEvents[0].Required);
                    let startClock;
                    let endClock;
                    chapelEvents.sort(sortDate);


                    for (let i = 0; i < numEvents; ++i) {

                        chapelEvents[i].Start_Time = chapelEvents[i].Occurrences[0][0];
                        chapelEvents[i].End_Time = chapelEvents[i].Occurrences[0][1];
                        chapelEvents[i].Location = chapelEvents[i].Occurrences[0][2];
                        chapelEvents[i].startTimeObject = chapelEvents[i].Start_Time;
                        chapelEvents[i].timeObject = chapelEvents[i].End_Time;

                        let startDate = new Date(chapelEvents[i].Start_Time);
                        let startYear = startDate.getFullYear();
                        let startMonth = startDate.getMonth();
                        let startDay = startDate.getDate();


                        chapelEvents[i].Description = formatDiscription(chapelEvents[i].Description);
                        chapelEvents[i].End_Time = setClock(chapelEvents[i].Start_Time, chapelEvents[i].End_Time, startClock, endClock);

                        if (chapelEvents[i].Event_Title === "") {
                            chapelEvents[i].Event_Title = chapelEvents[i].Event_Name;
                        }
                        chapelEvents[i].Start_Time = monthArry[startMonth] + ". " + startDay + ", " + startYear;
                    }
                    return {
                        //return all the deseired information
                        "chapelEvents": chapelEvents,
                        "eventShown": chapelEvents,
                        "eventsPercent": eventsPercent,
                    };

                });
        };

        let loadAllChapel = function() {
            return getAsync("/events/25Live/CLAW", context)
                .then(function(result) {
                    allEvents = result;
                    let numEvents = allEvents.length;
                    let startClock;
                    let endClock;
                    allEvents.sort(sortDate);


                    for (let i = 0; i < numEvents; ++i) {

                        allEvents[i].Start_Time = allEvents[i].Occurrences[0][0];
                        allEvents[i].End_Time = allEvents[i].Occurrences[0][1];
                        allEvents[i].Location = allEvents[i].Occurrences[0][2];
                        allEvents[i].startTimeObject = allEvents[i].Start_Time;
                        allEvents[i].timeObject = allEvents[i].End_Time;

                        let startDate = new Date(allEvents[i].Start_Time);
                        let startYear = startDate.getFullYear();
                        let startMonth = startDate.getMonth();
                        let startDay = startDate.getDate();


                        allEvents[i].Description = formatDiscription(allEvents[i].Description);
                        allEvents[i].End_Time = setClock(allEvents[i].Start_Time, allEvents[i].End_Time, startClock, endClock);

                        if (allEvents[i].Event_Title === "") {
                            allEvents[i].Event_Title = allEvents[i].Event_Name;
                        }
                        allEvents[i].Start_Time = monthArry[startMonth] + ". " + startDay + ", " + startYear;
                    }
                    return {
                        //return all the deseired information
                        "allEvents": allEvents
                    };

                });
        };

        let loadModel = function() {
            return {
                //return all the deseired information
                "chapelEvents": chapelEvents,
                "allEvents": allEvents,
                "eventShown": chapelEvents,
                "eventsPercent": eventsPercent,
                "searchValue": searchValue,
                "numEvents": numEvents
            };
        };

        //send to the front end
        return loadAllChapel()
            .then(loadChapel)
            .then(loadModel)
    }



});