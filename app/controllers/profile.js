import Ember from "ember";
import deleteAsync from "gordon360/utils/delete-async";

/*  Controller for the notification table.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    applicationController: Ember.inject.controller('application'),
    requestsRecieved: Ember.computed.alias('applicationController.requestsRecieved'),
    actions: {
        removeAdmin(id) {
            deleteAsync("/admins/" + id, this)
            .then(function() {
                window.location.reload(true);
            });
        },
        deleteRequest(requestID) {
            deleteAsync("/requests/" + requestID, this)
            .then(function() {
                 window.location.reload(true);
             });
        },
        toggleRecievedTable() {
            $("#membership-requests-recieved-table").slideToggle();
            $("#recieved-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        toggleSentTable() {
            $("#membership-requests-sent-table").slideToggle();
            $("#sent-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        toggleAdminTable() {
            $("#admin-table").slideToggle();
            $("#admin-table-header").toggleClass("glyphicon-menu-right glyphicon-menu-down");
        },
        toggleRequestSent(item){
            let elements = $(item.target).nextAll();
            for(var i=0; i < 3; i++){
                if($(window).innerWidth() < 768){
                    $(elements[i]).slideToggle();
                }
            }
        },
        toggleEditProfilePictureModal(){
             $("#toggleEditProfilePictureModal").addClass("showModal");
              console.log("This is my image");
        },
        cancelEditProfilePicture(){
             $("#toggleEditProfilePictureModal").removeClass("showModal");
        }
    }
});
