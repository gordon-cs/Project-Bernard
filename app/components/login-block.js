import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service("session"),
    actions: {
        authenticate() {
            // this.sendAction("authenticate");
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
