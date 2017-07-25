/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'gordon360',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },
        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
            apiUrl: 'http://360ApiTrain.gordon.edu/api',
            baseUrl: 'http://360ApiTrain.gordon.edu/'

        },
        'ember-simple-auth-token': {
            serverTokenEndpoint: '360ApiTrain.gordon.edu/token',
            authorizationPrefix: 'Bearer ',
            authorizationHeaderName: 'Authorization'
        }
    };

    if (environment === 'development') {
        ENV.locationType = 'hash';
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        ENV.locationType = 'hash';
        ENV.APP.apiUrl = 'https://360Api.gordon.edu/api';
        ENV.APP.baseUrl = 'https://360Api.gordon.edu';
        ENV['ember-simple-auth-token'].serverTokenEndpoint = 'https://360Api.gordon.edu/token';
    }

    return ENV;
};
