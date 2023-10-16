const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const path = require('path');

require('dotenv').config({ path: path.join(__dirname + '/secret.env')});

const PORT = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
var authCallbackPath = '/auth/spotify/callback';

passport.use(
    new SpotifyStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'http://localhost:' + PORT + authCallbackPath,
    }, (accessToken, refreshToken, profile, done) => { 
        // Callback function
        // Access token - token to access functions user granted when authenticating
        // Refresh token - refreshes access token
        // Profile - profile information (extracted from redirect URL)
        // done - function called when callback function is done
        console.log('passport callback function called');
        console.log(profile);
}))