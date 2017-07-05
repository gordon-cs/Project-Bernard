import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import isTranscriptWorthy from "gordon360/utils/is-transcript-worthy";
import sortJsonArray from "gordon360/utils/sort-json-array";
import getEncodedtranscriptlogo from "gordon360/utils/transcript-logo";

/*  Controller for the transcript page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        getPDF() {
            window.print();
        },
        toggleActivityTable(item){
            console.log(item.target);
            let elements = $(item.target).parent().nextAll();
            for(var i=0; i < 2; i++){
                if($(window).innerWidth() < 576){
                    $(elements[i]).slideToggle();
                }
            }
        }
    },
    // Create the PDF document that is shown and can be downloaded
    createPDF() {
        let context = this;
        let memberships = [];
        let leaderships = [];
        let membershipsDictionary = [];
        let hasLeaderships = false;
        let hasMemberships = false;
        // let sessions = [];

        let getMemberships = function() {
            return getAsync("/memberships/student/" + context.get("session.data.authenticated.token_data.id"), context);
        }
        let sortMemberships = function(result) {

            // Sort in chronological order
            memberships = sortJsonArray(result, "SessionCode").reverse();

            var activityCount = {};

            // Count number of times for each activity
            for (var i = 0, mem; i < memberships.length; i++) {
                mem = memberships[i];
                if (activityCount[mem.ActivityCode] == undefined) {
                    activityCount[mem.ActivityCode] = 1;
                }
                else {
                    activityCount[mem.ActivityCode] ++;
                }
            }

            // Group memberships in sessions
            for (var i = 0, mem; i < memberships.length; i++) {
                mem = memberships[i];
                let activitiesResult = $.grep(membershipsDictionary, function(e){ return e.SessionCode == mem.SessionCode; });
                if (activityCount[mem.ActivityCode] != undefined) {
                    mem.SemesterAcount = activityCount[mem.ActivityCode];
                    activityCount[mem.ActivityCode] = undefined;
                }
                else {
                    mem.SemesterAcount = "-";
                }
                if (activitiesResult.length == 0) {
                    // not found
                    membershipsDictionary.push({
                        SessionCode: mem.SessionCode,
                        SessionDescription: mem.SessionDescription,
                        Activities: [mem]
                    });
                } else {
                    // multiple items found
                    activitiesResult[0].Activities.push(mem);
                }
            }
            for (var i = 0; i < membershipsDictionary.length; i++) {
                membershipsDictionary[i].Activities = sortJsonArray(membershipsDictionary[i].Activities, "ActivityDescription");
            }

            console.log(membershipsDictionary);

        }
        let generatePDF = function() {
            const TITLE_TEXT = "Experience Transcript - " + context.get("session.data.authenticated.token_data.name");

            return {
                // "doc": doc,
                "memberships": memberships,
                "membershipsDictionary": membershipsDictionary,
                // "leaderships": leaderships,
                // "hasLeaderships": hasLeaderships,
                // "hasMemberships": hasMemberships,
                "title": TITLE_TEXT,
                "noActivity": !(hasLeaderships || hasMemberships)
            }
        }
        // Run all the functions
        return getMemberships()
        .then(sortMemberships)
        // .then(getSessions)
        .then(generatePDF);
    }
});
