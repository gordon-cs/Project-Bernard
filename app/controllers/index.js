import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        selectSession: function(session) {
            var activities = null;
            Ember.$.ajax({
                type: "GET",
                url: "http://ccttrain.gordon.edu/api/sessions/" + session.SessionCode.trim() + "/activities",
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
            this.set('model.activitiesShown', activities);
            this.set('model.currentSession', session);
        },
        filterActivities: function() {
            var searchValue = this.get("searchValue");
            var newList = [];
            var oldList = this.get("model.activities");
            for (var i = 0; i < oldList.length; i ++) {
                if (oldList[i].ActivityDescription.indexOf(searchValue) !== -1) {
                    newList.push(oldList[i]);
                }
            }
            this.set("model.activitiesShown", newList);
        }
    }
});
