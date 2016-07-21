import Ember from "ember";
import Base from "ember-simple-auth/authenticators/base";

export default Base.extend({
    session: Ember.inject.service("session"),

    refreshLeeway: (1000 * (60 * 2)),
    restore: function(data) {
        const now = (new Date()).getTime();
        let expiresAt = now + (data.expires_in * 1000);

        if (expiresAt > now) {
            var token = this.makeRequest(data.credentials);
            return new Ember.RSVP.Promise(function(resolve, reject) {
                resolve(token);
            });
        }
        else {
            return new Ember.RSVP.Promise(function(resolve, reject) {
                reject(new Error("token is expired"));
                this.transitionToRoute("login");
            });
        }
    },
    authenticate: function(credentials) {
        var token = this.makeRequest(credentials);
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            if (token.status === "success") {
                resolve(token);
            }
            else {
                reject(token.error);
            }
        });
        return promise;
    },
    invalidate: function(data) {
        return new Promise(function(resolve, reject) {
            resolve();
        });
    },
    // Decode JWT
    // Returns Decoded JSON Object
    getTokenData(accessToken) {
        const payload = accessToken.split(".")[1];
        const tokenData = JSON.parse(decodeURIComponent(window.escape(atob(payload))));
        return tokenData;
    },
    // Schedule a Token Refresh
    // Calls "accessTokenRefresh" After a Period of Time
    scheduleAccessTokenRefresh(credentials, token) {
        const now = (new Date()).getTime();
        let expiresIn = token.expires_in * 1000;
        let expiresAt = now + (token.expires_in * 1000);
        const wait = expiresAt - now - this.refreshLeeway;
        Ember.run.later(this, this.accessTokenRefresh, credentials, wait);
    },
    // Refresh Access Token
    accessTokenRefresh(credentials) {
        this.set("session.data.authenticated", this.makeRequest(credentials));
    },
    // Make Request for Access Token
    makeRequest(credentials) {
        var data = {
            "username": credentials.username,
            "password": credentials.password,
            "grant_type": "password"
        };
        var token = {};
        Ember.$.ajax({
            type: "POST",
            url: "https://gordon360api.gordon.edu/token",
            data: data,
            dataType: "json",
            async: false,
            success: function(data) {
                token = data;
                token.status = "success";
            },
            error: function(errorThrown) {
                console.log(errorThrown);
                token.error = JSON.parse(errorThrown.responseText).error_description;
                token.status = "error";
            }
        });
        if (token.status === "success") {
            token.token_data = this.getTokenData(token.access_token);
            token.credentials = credentials;
            this.scheduleAccessTokenRefresh(credentials, token);
        }
        return token;
    }
});
