import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        authenticate() {
            let credentials = {
                'username': this.get('identification'),
                'password': this.get('password')
            };
            this.get('session').authenticate('authenticator:oauth2', credentials).catch((reason) => {
                this.set('errorMessage', reason.error || reason);
            });
        }
    }
});
