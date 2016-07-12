import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    restore: function(data) {
        console.log('restore');
        console.log(data);
        return new Ember.RSVP.Promise(function(resolve, reject) {
            resolve(data);
            reject("Invalid Login");
        });
    },
    authenticate: function(username, password) {
        var data = {
            "username": username,
            "password": password,
            "grant_type": "password"
        };
        var token = null;
        Ember.$.ajax({
            type: "POST",
            url: "http://ccttrain.gordon.edu/api/token",
            data: data,
            dataType: "json",
            asyn: false,
            success: function(data) {
                console.log(data);
                token = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            if ((username.toLowerCase() === "dalton.weaner" ||
                    username.toLowerCase() === "dalton.weaner@gordon.edu") &&
                    password === "123") {
                resolve(data);
            }
            else {
                reject("Invalid Login");
            }
        });
        // promise.then(function(value) {
        //     }, function(reason) {
        // });
        console.log('Authenticate');
        console.log("Username: " + username);
        console.log("Password: " + password);
        return promise;
    },
    invalidate: function(data) {
        console.log('invalidate');
        console.log(data);
        return new Promise(function(resolve, reject) {
            resolve();
        });;
    }
});
