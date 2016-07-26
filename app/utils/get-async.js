// Asynchronous get function
// urlExtension - location to send request
// context - context function is being called from (use 'this')
// returns json data with success boolean and reponse
import apiConfig from "gordon360/config/api-config"

export default function getAsync(urlExtension, context) {
  let authenticationHeader;
  context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => {
    authenticationHeader = headerValue
  });

  var promise = Ember.$.ajax({
    type: "GET",
    url: apiConfig.apiUrl + urlExtension,
    headers: {
      "Authorization": authenticationHeader
    }
  });
  return promise;

}
