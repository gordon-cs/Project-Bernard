import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    actions: {
        selectSession: function(session) {
            var activities = null;
            this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
                Ember.$.ajax({
                    type: "GET",
                    url: "http://gordon360api.gordon.edu/api/sessions/" + session.SessionCode.trim() + "/activities",
                    async: false,
                    headers: {
                        "Authorization": headerValue
                    },
                    success: function(data) {
                        activities = data;
                    }
                });
            });
            this.set('model.activities', activities);
            this.set('model.activitiesShown', activities);
            this.set('model.currentSession', session);
        },
        filterActivities: function() {
            var searchValue = this.get("searchValue");
            var newList = [];
            var oldList = this.get("model.activities");
            for (var i = 0; i < oldList.length; i ++) {
                if (oldList[i].ActivityDescription.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                    newList.push(oldList[i]);
                }
            }
            this.set("model.activitiesShown", newList);
        }
    }
});
