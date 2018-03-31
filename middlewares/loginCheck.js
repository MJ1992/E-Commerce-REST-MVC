var passport = require('passport');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    } else {
        req.flash('error', 'You need to login first!');
        res.redirect('/login');
    }

};

module.exports = middlewareObj;