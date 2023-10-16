const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

// Auth with Spotify
router.get('/spotify', passport.authenticate('spotify',{
        scope: ['user-read-email', 'user-read-private'],
        showDialog: true,
    })
);

// Auth logout
router.get('/logout', (req, res) => {
    // Handle with Passport
    res.send('Logging out');
});

// Callback route -- passport = extra middleware (fired before response, 
//      automatically extracts profile code from URL, then calls callback
//      function in passport-setup)
router.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
    res.send('callback uri yuh');
});

module.exports = router;