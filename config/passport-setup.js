const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const path = require('path');

require('dotenv').config({ path: path.join(__dirname + '/secret.env')});

const PORT = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
var authCallbackPath = '/auth/spotify/callback';

console.log('ID ' + CLIENT_ID);
console.log('SEC ' + CLIENT_SECRET);

passport.use(
    new SpotifyStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'http://localhost:' + PORT + authCallbackPath,
    }, () => {
    // Passport callback function
}))