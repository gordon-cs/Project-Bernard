import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    restore: function(data) {
        console.log('restore');
        console.log(data);
    },
    authenticate: function(username, password) {
        var data = {
            "username": username,
            "password": password
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
        var promise = new Promise(function(resolve, reject) {
            if ((username.toLowerCase() === "dalton.weaner" ||
                    username.toLowerCase() === "dalton.weaner@gordon.edu") &&
                    password === "123") {
                resolve("Valid Login");
            }
            else {
                reject("Invalid Login");
            }
        });
        promise.then(function(value) {
            }, function(reason) {
        });
        console.log('Authenticate');
        console.log("Username: " + username);
        console.log("Password: " + password);
        return promise;
    },
    invalidate: function(data) {
        var promise = new Promise(function(resolve, reject) {
            resolve("value");
            reject(reason);
        });
        promise.then(function(value) {
            }, function(reason) {
        });
        console.log('invalidate');
        console.log(data);
        return promise;
    }
});
