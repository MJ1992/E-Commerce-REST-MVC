var LocalStrategy = require('passport-local'),
    GoogleStrategy = require('passport-google-oauth2'),
    User = require('../app/models/user');

module.exports = function(passport) {


    //local strategy    
    passport.use(new LocalStrategy(User.authenticate()));

    //Google login strategy
    passport.use(new GoogleStrategy({
        callbackURL: '/auth/google/cb',
        clientID: '411136592953-s81vtdgt7mi8au1f408amosjio3f0tfo.apps.googleusercontent.com',
        clientSecret: 'CwlilNCPhnU7BUz_3eGQiiyl'
    }, function(accessToken, refreshToken, profile, done) {
        console.log(profile, done);
        User.findOne({ 'email': profile.email }, function(err, user) {
            if (err) {
                return done(err);
            }
            //if user found in db with email associated with gmail return that user
            if (user) {
                return done(null, user);
            }
            //if user not found with gmail id then create a new user in db
            else {
                var newUser = new User();
                newUser.username = profile.email;
                newUser.email = profile.email;


                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

};