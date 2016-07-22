import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        authenticate() {
            // Set credentials
            let credentials = {
                "username": this.get("identification").replace("@gordon.edu",""),
                "password": this.get("password")
            };
            // Get authentication token
            this.get("session").authenticate("authenticator:gordon-authenticator", credentials).catch((reason) => {
                this.set("errorMessage", reason.error || reason);
            });
        }
    }
});
