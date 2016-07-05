import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        selectSession: function(session) {
            var activities = null;
            Ember.$.ajax({
                type: "GET",
                url: "https://ccttrain.gordon.edu/api/sessions/" + session.SessionCode.trim() + "/activities",
                async: false,
                success: function(data) {
                    activities = data;
                    console.log(data);
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            });
            this.set('model.activities', activities);
            this.set('model.currentSession', session);
        }
    }
});
