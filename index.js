const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config({ path: path.join(__dirname + 'config/secret.env')});

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(session({
    secret: [process.env.COOKIE_KEY], // used to encrypt cookie
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // max age of cookie, in milliseconds (1 day)
}));

// Initialize passport to use session
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log(err));

// Configure app to user authRoutes, '/auth' is path to access router
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/', (req, res) => {
    res.render('home', { user: req.user }); // Replace with states (Redux?)
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});