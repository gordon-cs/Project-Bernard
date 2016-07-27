// Asynchronous post function for sending files
// urlExtension - location to send request
// data - FormData to be sent. The file should be included in the FormData object
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import apiConfig from "gordon360/config/api-config"

export default function postFileAsync(urlExtension, data, context) {
    let authenticationHeader;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        authenticationHeader = headerValue
    });

    let promise = Ember.$.ajax({
        type: "POST",
        url: apiConfig.apiUrl + urlExtension,
        contentType: false,
        processData: false,
        data: data,
        headers: {
            "Authorization": authenticationHeader
        }
    });
    return promise;
}
