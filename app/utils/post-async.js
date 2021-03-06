// Asynchronous post function
// urlExtension - location to send request
// data - json data to be posted
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import ENV from "gordon360/config/environment"

export default function postAsync(urlExtension, data, context) {
    let authenticationHeader;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        authenticationHeader = headerValue
    });

    let promise = Ember.$.ajax({
        type: "POST",
        url: ENV.APP.apiUrl + urlExtension,
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": authenticationHeader
        }
    });
    // Wrapping jquery calls in Promise.resolve
    // See https://www.promisejs.org/ under the Jquery section to see the reason why.
    // TL;DR - Jquery has a weird implementation of Promises. This standerdizes it.
    return Ember.RSVP.resolve(promise);
}
