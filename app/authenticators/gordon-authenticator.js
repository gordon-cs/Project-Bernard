import Ember from "ember";
import Base from "ember-simple-auth/authenticators/base";
import ENV from "gordon360/config/environment"

export default Base.extend({
    session: Ember.inject.service("session"),
    refreshLeeway: (1000 * (60 * 2)), // Time (in milliseconds) between token refresh and token expire
    // Restore token data when page is refreshed
    restore: function(data) {
        const now = (new Date()).getTime();
        let expiresAt = now + (data.expires_in * 1000);
        if (expiresAt > now) {
            return this.makeRequest(data.credentials);
        }
        else {
            return new Ember.RSVP.Promise(function(resolve, reject) {
                reject(new Error("token is expired"));
                this.transitionToRoute("login");
            });
        }
    },
    // Authenticate credentials
    authenticate: function(credentials) {
        let context = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            return context.makeRequest(credentials)
            .then(function(result) {
                    return resolve(result);
                }, function(error) {
                    return reject(error.error);
            });
        });
    },
    // Invalidate session
    invalidate: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
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
        let context = this;
        context.makeRequest(credentials)
        .then( function( token ) {
            context.set("session.data.authenticated", token);
        });
    },
    // Make Request for Access Token
    makeRequest(credentials) {
        let context = this;
        var data = {
            "username": credentials.username,
            "password": credentials.password,
            "grant_type": "password"
        };
        let makeCall = function() {
            return Ember.$.ajax({
                type: "POST",
                url: ENV['ember-simple-auth-token'].serverTokenEndpoint,
                data: data,
                dataType: "json"
            });
        }
        let setToken = function(result) {
            result.token_data = context.getTokenData(result.access_token);
            result.credentials = credentials;
            result.status = "success";
            context.scheduleAccessTokenRefresh(credentials, result);
            return result;
        }
        let setErrorToken = function(error) {
            error.error = new Error (error.responseJSON.error_description);
            error.status = "error";
            return error;
        }
        return makeCall()
            .then(setToken, setErrorToken);
    }
});
