import Ember from 'ember';
import getSync from "gordon360/utils/get-sync";
import postSync from "gordon360/utils/post-sync";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    errorMessage: null,
    /* All the actions that can be called from interaction with add-supervisor.hbs */
    actions: {
        post() {

        }
    }
});
