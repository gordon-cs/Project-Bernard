import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import getAsync from "gordon360/utils/get-async";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params, transition) {

    let term;
    let numEvents;
    let chapelEvents;
    let context = this;
    let id_number = this.get("session.data.authenticated.token_data.id");
    let date = new Date().getFullYear();
    let month = new Date().getMonth();
    let eventsPercent;

    let monthArry = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    /*for( let i = 0; i<chapelEvents.length; ++i){
      let eventDate = new Date(chapelEvents[i].CHDate);
      let eventMonth = eventDate.getMonth();
      console.log(eventMonth);
      return chapelEvents;}*/

    if (month>=0&&month<=6){
      term = "SP";
      date = date - 2;
    }
    else if((month>=7&&month<=11)){
      term = "FA";
    }
    let subdate = date.toString().substr(-2);


    let termCode = subdate + term;
    console.log(termCode);

    let loadChapel =  function(){
      return getAsync("/chapel_event/Student/" + id_number + "/" + "15FA" , context);};

    let loadModel = function(result) {
      console.log(result);
      let chapelEvents = result;
      numEvents = chapelEvents.length;
      eventsPercent = Math.round((numEvents*100)/30);
      let displayTime;

      for( let i = 0; i<numEvents; ++i){

        let eventDate = new Date(chapelEvents[i].CHDate);
        let eventMonth = eventDate.getMonth();
        let eventDay = eventDate.getDate();
        console.log(eventMonth);
        chapelEvents[i].CHDate = monthArry[eventMonth]+ ". "+ eventDay ;

        let eventtime = new Date(chapelEvents[i].CHTime).getHours();
        let eventMin = new Date(chapelEvents[i].CHTime).getMinutes();
        if (eventMin < 10){
          eventMin = "0" + eventMin;
        }
        if (eventtime > 12) {
          eventtime = eventtime - 12
          displayTime = eventtime + ":" + eventMin + "pm";
          }
       else {
            displayTime = eventtime + ":" + eventMin + "am";
          }
            chapelEvents[i].CHTime = displayTime;
        }

      return {
        "chapelEvents": chapelEvents,
        "numEvents":numEvents,
        "eventsPercent": eventsPercent
      };
    };


    return loadChapel()
      .then(loadModel)
  }



});
