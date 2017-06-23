import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params, transition) {

    //initialize variables
    let context = this;
    let id_number = this.get("session.data.authenticated.token_data.id");
    let monthArry = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    //subtract a year if it is the spring semester,
    //take away the first two digits of the year ie. (yyyy -> yy)
    //create termcode based on month,and shorten year
    let month = new Date().getMonth();
    let date = new Date().getFullYear()-(month >=0&& month <=6? 1:0);
    let term = (month >=0 && month <=6? "SP": "FA");
    let subdate = date.toString().substr(-2);
    let termCode = subdate + term;


    console.log(termCode);
    let load25 = $.ajax('https://25live.collegenet.com/25live/data/gordon/run/events.xml?/&event_id=636&scope=extended');
    console.log(load25);
    //retreive the chapel information from the database
    let loadChapel =  function(){
      return getAsync("/event/chapel/Student/" + id_number + "/" + termCode , context);};

    //Formate the information you want to display
    let loadModel = function(result) {
      console.log(result);


      let chapelEvents = result;
      let displayTime;
      let numEvents = chapelEvents.length;
      let eventsPercent = Math.round((numEvents*100)/30);

      for( let i = 0; i<numEvents; ++i){

        //get the date information
        let eventDate = new Date(chapelEvents[i].CHDate);
        let eventMonth = eventDate.getMonth();
        let eventDay = eventDate.getDate();
        let eventHour = new Date(chapelEvents[i].CHTime).getHours();
        let eventMin = new Date(chapelEvents[i].CHTime).getMinutes();

        //insert the formated date back into the JSON array
        chapelEvents[i].CHDate = monthArry[eventMonth]+ ". "+ eventDay;

        console.log(eventMonth);

        //create a 12 hour clock
        if (eventMin < 10){
          eventMin = "0" + eventMin;
        }

        if (eventHour > 12) {
          eventHour = eventHour - 12
          displayTime = eventHour + ":" + eventMin + "pm";
          }

       else {
            displayTime = eventHour + ":" + eventMin + "am";
          }

      //insert that back into the JSON array
      chapelEvents[i].CHTime = displayTime;
    }

      return {
        //return all the deseired information
        "chapelEvents": chapelEvents,
        "numEvents":numEvents,
        "eventsPercent": eventsPercent
      };
    };

    //send to the front end
    return loadChapel()
      .then(loadModel)
  }



});
