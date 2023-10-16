const router = require('express').Router();

// Creating auth check middleware to see if user is logged in
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next(); // go onto next function
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {user: req.user});
});

module.exports = router;