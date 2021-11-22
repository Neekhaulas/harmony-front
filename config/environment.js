'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'front',
    environment,
    rootURL: '/',
    locationType: 'auto',
    apiUrl: null,
    apiHost: null,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-simple-auth-token'] = {
      refreshTokenPropertyName: 'token',
      serverTokenEndpoint: 'http://localhost:8080/auth/login',
      serverTokenRefreshEndpoint: 'http://localhost:8080/token-refresh',
      refreshLeeway: 5,
      tokenPropertyName: 'access_token',
    };
    ENV.apiUrl = 'http://localhost:8080';
    ENV.apiHost = 'ws://localhost:3000';
    ENV.s3Host = 'https://neekhaulas-harmony.s3.eu-central-1.amazonaws.com/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV['ember-simple-auth-token'] = {
      refreshTokenPropertyName: 'token',
      serverTokenEndpoint: 'https://harmonyapi.neekhaulas.com/auth/login',
      serverTokenRefreshEndpoint:
        'https://harmonyapi.neekhaulas.com/token-refresh',
      refreshLeeway: 5,
      tokenPropertyName: 'access_token',
    };
    ENV.apiUrl = 'https://harmonyapi.neekhaulas.com';
    ENV.apiHost = 'wss://harmonyapi.neekhaulas.com:3000';
    ENV.s3Host = 'https://neekhaulas-harmony.s3.eu-central-1.amazonaws.com/';
  }

  return ENV;
};
