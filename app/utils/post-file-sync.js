// Synchronous post function for sending files
// urlExtension - location to send request
// data - FormData to be sent. The file should be included in the FormData object
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import apiConfig from "gordon360/config/api-config"

export default function postFileSync(urlExtension, data, context) {
    let success;
    let response = null;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        Ember.$.ajax({
            type: "POST",
            url: apiConfig.apiUrl + urlExtension,
            contentType: false,
            processData: false,
            data: data,
            async: false,
            headers: {
                "Authorization": headerValue
            },
            success: function(data) {
                success = true;
                response = data;
            },
            error: function(errorThrown) {
                success = false;
                response = errorThrown;
            }
        });
    });
    return {
        "success": success,
        "data": response
    };
}
