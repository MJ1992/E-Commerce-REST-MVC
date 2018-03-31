var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = require('./models/user'),
    Product = require('./models/product'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session'),
    async = require('async'),
    nodemailer = require('nodemailer'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    crypto = require('crypto');

var authRoutes = require('./Routes/auth');
var productRoutes = require('./Routes/product');
//var categoryRoutes = require('./Routes/category');

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

app.use(session({
    secret: 'ertfjnsmchgshoff',
    resave: true,
    saveUninitialized: true
}));

//Express Messages

app.use(flash());


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(methodOverride('_method'));
app.use('/', authRoutes);
app.use('/products', productRoutes);
//app.use(categoryRoutes);



//==========//
//Routes
//==========//
app.get('/', function(req, res) {
    res.send("Hello FurCart");
});


app.listen(3000, function() {
    console.log('App running at port 3000');
});