// Asynchronous put function
// urlExtension - location to send request
// data - json data to be updated
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import apiConfig from "gordon360/config/api-config"

export default function putAsync(urlExtension, data, context) {
    let authenticationHeader;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        authenticationHeader = headerValue
    });
    
    let promise = Ember.$.ajax({
        type: "PUT",
        url: apiConfig.apiUrl + urlExtension,
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": authenticationHeader
        }
    });
    return promise;
}