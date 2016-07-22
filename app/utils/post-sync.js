// Synchronous post function
// urlExtension - location to send request
// data - json data to be posted
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
export default function postSync(urlExtension, data, context) {
    let success;
    let response = null;
    context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
        Ember.$.ajax({
            type: "POST",
            url: "https://gordon360api.gordon.edu/api" + urlExtension,
            contentType: "application/json",
            data: JSON.stringify(data),
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
