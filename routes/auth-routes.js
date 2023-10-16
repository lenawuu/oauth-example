const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

// Auth with Spotify
router.get('/spotify', passport.authenticate('spotify',{
        scope: ['user-read-email', 'user-read-private'],
        showDialog: false,
    })
);

// Auth logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) { return next(err); }
        res.redirect('/');
    });
});

// Callback route -- passport = extra middleware (fired before response, 
//      automatically extracts profile code from URL, then calls callback
//      function in passport-setup)
router.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;