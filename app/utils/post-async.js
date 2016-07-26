// Asynchronous post function
// urlExtension - location to send request
// data - json data to be posted
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import apiConfig from "gordon360/config/api-config"

export default function postAsync(urlExtension, data, context) {
    let authenticationHeader;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        authenticationHeader = headerValue
    });

    let promise = Ember.$.ajax({
        type: "POST",
        url: apiConfig.apiUrl + urlExtension,
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": authenticationHeader
        }
    });
    return promise;
}
