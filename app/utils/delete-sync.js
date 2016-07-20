// Synchronous delete function
// urlExtension - location to send request
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
export default function deleteSync(urlExtension, context) {
    let success;
    let response = null;
    context.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
        Ember.$.ajax({
            type: "DELETE",
            url: "https://gordon360api.gordon.edu/api" + urlExtension,
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