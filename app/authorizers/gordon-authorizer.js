import Base from "ember-simple-auth/authorizers/base";

export default Base.extend({
    // Authorizes a block of code
    // Use: 'context.get("session").authorize("authorizer:gordon-authorizer", (headerName, headerValue) => { "code here" });'
    // Add: 'headers: {"Authorization": headerValue}' to all requests to server
    authorize: function(data, block) {
        const accessToken = data["access_token"];
        if (!Ember.isEmpty(accessToken)) {
            block("Authorization", `Bearer ${accessToken}`);
        }
    }
});
