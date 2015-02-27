/**
 * Passport configuration
 *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {

    development: {
        facebook: {
            name: 'Facebook',
            protocol: 'oauth2',
            strategy: require('passport-facebook').Strategy,
            options: {
                clientID: '1403704419936183',
                clientSecret: '44c8391d322576e7ac28979eca2aaa40',
                callbackURL: 'http://localhost:1337/auth/facebook/callback',
                scope: 'public_profile,email'
            }
        },

        'facebook-token': {
            name: 'FacebookToken',
            protocol: 'oauth2',
            strategy: require('passport-facebook-token').Strategy,
            options: {
                clientID: '1403704419936183',
                clientSecret: '44c8391d322576e7ac28979eca2aaa40',
                scope: 'public_profile,email'
            }
        },

        google: {
            name: 'Google',
            protocol: 'oauth2',
            strategy: require('passport-google-oauth').OAuth2Strategy,
            options: {
                clientID: 'your-client-id',
                clientSecret: 'your-client-secret'
            }
        }
    },

    production: {
        facebook: {
            name: 'Facebook',
            protocol: 'oauth2',
            strategy: require('passport-facebook').Strategy,
            options: {
                clientID: '1403705003269458',
                clientSecret: '55b32cf7f04e8b8ae174555d4074b9f3',
                callbackURL: 'http://smartbs.ddns.net:8080/auth/facebook/callback',
                scope: 'public_profile,email'
            }
        },

        'facebook-token': {
            name: 'FacebookToken',
            protocol: 'oauth2',
            strategy: require('passport-facebook-token').Strategy,
            options: {
                clientID: '1403705003269458',
                clientSecret: '55b32cf7f04e8b8ae174555d4074b9f3',
                scope: 'public_profile,email'
            }
        }
    }
};
