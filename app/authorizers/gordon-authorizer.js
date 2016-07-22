import Base from "ember-simple-auth/authorizers/base";

export default Base.extend({
    authorize: function(data, block) {
        const accessToken = data["access_token"];
        if (!Ember.isEmpty(accessToken)) {
            block("Authorization", `Bearer ${accessToken}`);
        }
    }
});
