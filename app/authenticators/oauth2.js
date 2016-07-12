// import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
//
// export default OAuth2PasswordGrant.extend({
//     serverTokenEndpoint: 'http://gordon360api.gordon.edu/token'
// });

// Default
// ——————————————————————————————————————————————————————————————————
// Custom

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    restore: function(data) {
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
            url: "http://gordon360api.gordon.edu/token",
            data: data,
            dataType: "json",
            async: false,
            success: function(data) {
                console.log(data);
                token = data;
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            if (token !== null) {
                resolve(token);
            }
            else {
                reject("Invalid Login");
            }
        });
        // promise.then(function(value) {
        //     }, function(reason) {
        // });
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
