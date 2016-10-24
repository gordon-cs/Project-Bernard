import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import postAsync from "gordon360/utils/post-async";

/*  Controller for the add admin page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        post() {
            let context = this;
            let email = this.email;
            let leading = this.model.leading;
            let IDNumber = this.get("session.data.authenticated.token_data.id");

            // Check if all the inputs are valid
            let errorChecks = function() {
                let passed = true;
                let regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                if (leading) {
                    if (email == null || email == "") {
                        passed = false;
                        context.set("errorMessage", "Email required");
                    }
                    if (email.indexOf("@gordon.edu") === -1) {
                        email = email + "@gordon.edu";
                    }
                    if (! regexEmail.test(email)) {
                        context.set("errorMessage", "Invalid email");
                        passed = false;
                    }
                }
                else {
                    passed = false;
                    context.set("errorMessage", "You must be an admin to add other admins");
                }
                return passed;
            };

            // Display error message on the page
            let showError = function(result) {
                context.set("errorMessage", new Error(result.responseText));
            };

            // Get the account from email
            let getAccount = function() {
                return getAsync("/accounts/email/" + email + "/", context).catch(showError);
            };

            // Send data for admin
            let postAdmin = function(result) {
                let data = {
                    "ID_NUM": result.GordonID,
                };
                return postAsync("/admins", data, context).catch(showError);
            };

            // Leave inputs blank and transition back to activity
            let transition = function(result) {
                context.set("email", null);
                context.set("errorMessage", null);
                context.transitionToRoute("/profile");
            };

            if (errorChecks()) {
                getAccount()
                .then(postAdmin)
                .then(transition);
            }
        },
        cancel() {
            this.set("email", null);
            this.set("errorMessage", null);
            this.transitionToRoute("/profile");
        }
    }
});
