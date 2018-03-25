var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(req, res) {
    res.render('home');

});


router.get('/secret', isLoggedIn, function(req, res) {
    res.render('secret');
});

//show sign up form
router.get('/register', function(req, res) {
    res.render('register');
});

//handling user sign up
router.post('/register', function(req, res) {


    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {

            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.send('Registered Successfully');
            });

        }

    });
});

//Login Route

//show login form
router.get('/login', function(req, res) {
    res.render('login');
});

//handling user login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res) {


});

//logOut

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('login');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    } else {
        res.redirect('/login');
    }

}


module.exports = router;