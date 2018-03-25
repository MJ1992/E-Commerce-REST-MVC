var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = require('./models/user'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session'),
    Routes = require('./Routes/auth');

//Using application level middleware BodyParser
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//database conffiguration

var dbPath = "mongodb://localhost/furCart";

//connect to database
db = mongoose.connect(dbPath);
mongoose.connection.once('open', function() {
    console.log("database Connection success");
});

app.use(session({
    secret: 'ertfjnsmchgshoff',
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', Routes);
//==========//
//Routes
//==========//
app.get('/', function(req, res) {
    res.send("Hello FurCart");
})


app.listen(3000, function() {
    console.log('App running at port 3000');
});