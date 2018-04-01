var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    addDataToDB = require('./seeds'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session'),
    async = require('async'),
    nodemailer = require('nodemailer'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    crypto = require('crypto'),
    fs = require('fs');


//Using application level middleware BodyParser
app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

//logging 
app.use(logger('dev'));
//database conffiguration

var dbPath = "mongodb://localhost/FlopKart";

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

//PassportJS setup
require('./config/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());


//App level middleware to flash messages and store current user from passportjs
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(methodOverride('_method'));

//reading model files and requiering them using file system 
fs.readdirSync('./app/models').forEach(function(file) {
    if (file.indexOf('.js')) {
        require('./app/models/' + file);
    }
});

//reading model files and requiering them using file system
fs.readdirSync('./app/controllers').forEach(function(file) {
    if (file.indexOf('.js')) {
        var route = require('./app/controllers/' + file);
        route.controller(app);

    }
});


//App level middleware for error handling
// Error handling middle-ware

app.use(function(err, req, res, next) {

    console.log(err.message);

    res.status(422).send({ error: err.message });
});

//error handle middleware when user enter a wrong url

app.use('*', function(req, res) {
    res.status(404).render("error404");
});



//Port setup 
app.listen(3000, function() {
    console.log('App running at port 3000');
});