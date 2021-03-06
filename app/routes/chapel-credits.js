import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params, transition) {

        //initialize variables
        let context = this;
        let college_role = this.get('session.data.authenticated.token_data.college_role');
        let noChapel = false;
        let attendedButton ="Show Attended Events";
        let id_name = this.get("session.data.authenticated.token_data.user_name");
        let monthArry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let fullMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let sort = {
            "type": "startTimeObject",
            "direction": "down"
        }
        let searchValue;
        let eventShown;
        let numEvents;
        let eventsPercent;
        let chapelEvents = [];
        let allEvents = [];
        let required;
        let requiredEventsString;
        let currentDate = new Date();
        let futureEvents = [];

        let setUserType = function() {
            let IsFaculty = ( college_role.includes("fac"));
            let IsAlumni = ( college_role.includes("alu"));
            if(IsAlumni || IsFaculty){
                noChapel = true;
            }
            
        }

        //subtract a year if it is the spring semester,
        //take away the first two digits of the year ie. (yyyy -> yy)
        //create termcode based on month,and shorten year
        let month = new Date().getMonth();
        let date = new Date().getFullYear() - (month >= 0 && month <= 6 ? 1 : 0);
        let term = (month >= 0 && month <= 6 ? "SP" : "FA");
        let subdate = date.toString().substr(-2);
        let termCode = subdate.concat(term);

        function sortDate(first, second) {
            if (first.startTimeObject === second.startTimeObject)
                return 0;
            if (first.startTimeObject < second.startTimeObject)
                return -1;
            else
                return 11;
        }

        //formate the event discription and get rid of all html tags
        let formatDiscription = function(Discription) {

            if (Discription === "" || Discription.substring(0, 4) === "<res") {
                return "No description available";
            } else {
                return Discription.replace(/&(#[0-9]+|[a-zA-Z]+);/g, " ").replace(/<\/?[^>]+(>|$)/g, " ");
            }

        };

        //formate a clock with
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
        //take the date object and apply the formating functions
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


        //retreive the chapel information from the database and then formate the events listed
        let loadChapel = function() {
            return getAsync("/events/chapel/" + id_name + "/" + termCode, context)
                .then(function(result) {
                    chapelEvents = result;
                    // console.log(chapelEvents);
                    numEvents = chapelEvents.length;
                    if (chapelEvents.length >= 1) {
                        eventsPercent = Math.round((numEvents * 100) / chapelEvents[0].Required);
                        required = chapelEvents[0].Required;
                        requiredEventsString = numEvents + "/" + required + " CL&W Credits";
                    } else {
                        required = 0;
                        eventsPercent = 0;
                        requiredEventsString = "No Attendance Recorded";
                    }
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
                        chapelEvents[i].End_Time = formatClock(chapelEvents[i].Start_Time, chapelEvents[i].End_Time, startClock, endClock);

                        if (chapelEvents[i].Event_Title === "") {
                            chapelEvents[i].Event_Title = chapelEvents[i].Event_Name;
                        }


                        chapelEvents[i].Month = fullMonth[startMonth];
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

        //get all the chapel events in the future and then formate the responses
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
                        allEvents[i].End_Time = formatClock(allEvents[i].Start_Time, allEvents[i].End_Time, startClock, endClock);

                        if (allEvents[i].Event_Title === "") {
                            allEvents[i].Event_Title = allEvents[i].Event_Name;
                        }
                        allEvents[i].Month = fullMonth[startMonth];
                        allEvents[i].Start_Time = monthArry[startMonth] + ". " + startDay + ", " + startYear;


                        if (startDate.getTime() >= currentDate.getTime()) {
                            futureEvents.push(allEvents[i]);
                        }
                    }
                    

                    futureEvents.sort(sortDate);
                    return {
                        //return all the deseired information
                        "allEvents": allEvents,
                        "futureEvents": futureEvents
                    };

                });
        };

        //load the model and return all the important information
        let loadModel = function() {
            return {
                //return all the deseired information
                "chapelEvents": chapelEvents,
                "allEvents": futureEvents,
                "required": required,
                "eventShown": futureEvents,
                "eventsPercent": eventsPercent,
                "searchValue": searchValue,
                "numEvents": numEvents,
                "requiredEventsString": requiredEventsString,
                "sort": sort,
                'noChapel': noChapel,
                "bool1": true,
                "attendedButton": attendedButton
                
            };
        };

        //send to the front end

        return loadAllChapel()
            .then(setUserType)
            .then(loadChapel)
            .then(loadModel)
    },



});