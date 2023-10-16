const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const path = require('path');

require('dotenv').config({ path: path.join(__dirname + '/secret.env')});

const PORT = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const User = require('../models/user-model');
var authCallbackPath = '/auth/spotify/callback';

// Serializes user (gets mongodb user id) and passes into browser cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializes user ID to check for match
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});

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

        // Check if user is already in DB
        User.findOne({spotifyId: profile._json.id})
            .then((currentUser) => {
                if(currentUser){
                    console.log('User is ', currentUser);
                    // 'done' indicates end of stage (moves onto serialize next)
                    done(null, currentUser); 
                } else {
                    new User({
                        username: profile._json.display_name,
                        spotifyId: profile._json.id
                    }).save()
                        .then((newUser) => {
                            console.log('new user created: ' + newUser);
                            done(null, newUser);
                        })
                        .catch((err) => {
                            console.log('Error creating user smh: ' + err);
                        });
                }
            })
    })
)