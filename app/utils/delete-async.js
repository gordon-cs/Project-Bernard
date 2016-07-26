// Asynchronous delete function
// urlExtension - location to send request
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import apiConfig from "gordon360/config/api-config"

export default function deleteAsync(urlExtension, context) {
    let authenticationHeader;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        authenticationHeader = headerValue
    });

    let promise = Ember.$.ajax({
        type: "DELETE",
        url: apiConfig.apiUrl + urlExtension,
        headers: {
            "Authorization": authenticationHeader
        }
    });
    return promise;
}