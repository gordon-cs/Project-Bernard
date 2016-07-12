import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        authenticate() {
            let { identification, password } = this.getProperties('identification', 'password');
            this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
                this.set('errorMessage', reason.error || reason);
            });

            // var credentials = {
            //     'identification': this.get('username'),
            //     'password': this.get('password')
            // }, authenticator = 'authenticator:token';
            // var headers = {
            //     'grant_type': 'password'
            // };
            // console.log(credentials);
            // this.get('session').authenticate(authenticator, credentials, headers);

            // this.transitionToRoute('all-activities');
        }
    }
});
