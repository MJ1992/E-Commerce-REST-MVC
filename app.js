var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = require('./app/models/user'),
    Product = require('./app/models/product'),
    addDataToDB = require('./seeds'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    GoogleStrategy = require('passport-google-oauth2'),
    session = require('express-session'),
    async = require('async'),
    nodemailer = require('nodemailer'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    crypto = require('crypto');

var authRoutes = require('./app/controllers/auth');
var productRoutes = require('./app/controllers/product');
var cartRoutes = require('./app/controllers/cart');


//Using application level middleware BodyParser
app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

//database conffiguration

var dbPath = "mongodb://localhost/furCart";

//connect to database
db = mongoose.connect(dbPath);
mongoose.connection.once('open', function() {
    console.log("database Connection success");
});

addDataToDB(); //adding data from seeds.js file for products

app.use(session({
    secret: 'ertfjnsmchgshoff',
    resave: true,
    saveUninitialized: true
}));

//Express Messages
app.use(flash());


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//Local strategy for login
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
        if (user) {
            return done(null, user);
        } else {
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

//App level middleware to flash messages and store current user from passportjs
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(methodOverride('_method'));
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/', cartRoutes);






//Port setup 
app.listen(3000, function() {
    console.log('App running at port 3000');
});