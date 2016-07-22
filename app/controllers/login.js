import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        authenticate() {
            // Remove '@gordon.edu' if appended to username
            var username = this.get("identification");
            let index = username.indexOf("@gordon.edu");
            if (index !== -1) {
                username = username.slice(0, index);
            }
            // Set credentials
            let credentials = {
                "username": username,
                "password": this.get("password")
            };
            // Get authentication token
            this.get("session").authenticate("authenticator:gordon-authenticator", credentials).catch((reason) => {
                this.set("errorMessage", reason.error || reason);
            });
        }
    }
});
