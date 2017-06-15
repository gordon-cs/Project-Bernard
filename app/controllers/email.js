import Ember from "ember";
import putAsync from "gordon360/utils/put-async";

/*  Controller for the edit membership page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    mediumEditorOptions: {
        "toolbar": {
        "buttons": ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'unorderedlist', 'orderedlist'],
        },
        "checkLinkFormat": true,
        "forcePlainText": true
    },
    actions: {
        send() {
            let context = this;
            let emailSubject = $("#email-subject").val();
            let emailContent = $("#email-content").html();
            let password = $("#password").val();
            let fromAddress = context.get("session.data.authenticated.token_data.name") + "@gordon.edu";
            let toAddress = context.get("model");
            console.log(toAddress);
            let data = {
                "ToAddress": toAddress,
                "FromAddress": fromAddress,
                "Subject": emailSubject,
                "Content": emailContent,
                "Password": password
            }
            putAsync("/emails", data, context).then(function(){
                $("#email-div").hide();
                $("#success-msg").show();
            })
        }
    }
});
