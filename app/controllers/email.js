import Ember from "ember";
import putAsync from "gordon360/utils/put-async";
import ENV from "gordon360/config/environment"

/*  Controller for the edit membership page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    // query params. emailType - "personal"/"group".
    queryParams: ['emailType','emailAddress','activityCode','sessionCode'],
    emailType: null,
    emailAddress: null,
    activityCode: null,
    sessionCode: null,
    session: Ember.inject.service('session'),
    mediumEditorOptions: {
        "toolbar": {
        "buttons": ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'unorderedlist', 'orderedlist'],
        },
        "checkLinkFormat": true,
        "forcePlainText": true
    },
    actions: {
        send() {
            $("#email-div").hide();
            $("#attempting-msg").show();
            // Make Request for Access Token
            let makeRequest = function(credentials) {
                let context = this;
                var data = {
                    "username": credentials.username,
                    "password": credentials.password,
                    "grant_type": "password"
                };
                let makeCall = function() {
                    return Ember.$.ajax({
                        type: "POST",
                        url: ENV['ember-simple-auth-token'].serverTokenEndpoint,
                        data: data,
                        dataType: "json"
                    });
                }
                return makeCall();
            }

            let context = this;
            let emailSubject = $("#email-subject").val();
            let emailContent = $("#email-content").html();
            let username = $("#username").val().replace("@gordon.edu","");
            let password = $("#password").val();
            let credentials = {
                username: username,
                password: password
            }

            let sendEmail = function() {
                let fromAddress = username + "@gordon.edu";
                if (context.get("emailType") == "personal" || context.get("emailType") == null) {
                    let toAddress = context.get("emailAddress");
                    let data = {
                        "ToAddress": toAddress,
                        "FromAddress": fromAddress,
                        "Subject": emailSubject,
                        "Content": emailContent,
                        "Password": password
                    } 
                    putAsync("/emails", data, context)
                    .then(function(){
                        $("#attempting-msg").hide();
                        $("#success-msg").show();
                    })
                }
                else if (context.get("emailType") == "group") {
                    let activityCode = context.get("activityCode");
                    let sessionCode = context.get("sessionCode");
                    let data = {
                        "FromAddress": fromAddress,
                        "Subject": emailSubject,
                        "Content": emailContent,
                        "Password": password
                    }
                    putAsync("/emails/activity/" + activityCode + "/session/" + sessionCode , data, context)
                    .then(function(){
                        $("#attempting-msg").hide();
                        $("#success-msg").show();
                    })
                }

            }

            let setErrorMsg = function() {
                context.set("errorMessage","Wrong username or password");
                $("#password").val("");
            }

            makeRequest(credentials).then(sendEmail, setErrorMsg);

        }
    }

});
