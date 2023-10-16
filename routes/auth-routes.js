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

module.exports = router;