import Ember from "ember";

/*  Controller for the login page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        authenticate() {
            // Set credentials
            let credentials = {
                "username": this.get("identification").replace("@gordon.edu",""),
                "password": this.get("password")
            };
            let passed = true;

            if (credentials.password == null || credentials.password == '') {
                this.set("errorMessage", "Password required");
                passed = false;
            }
            if (credentials.username == null || credentials.username == '') {
                this.set("errorMessage", "Username required");
                passed = false;
            }
            if (passed) {
                // Get authentication token
                this.get("session").authenticate("authenticator:gordon-authenticator", credentials).catch((reason) => {
                    this.set("errorMessage", reason.error || reason);
                });
            }
        }
    }
});
