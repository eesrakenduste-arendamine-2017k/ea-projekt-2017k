// Need on dependecied mida on vaja projekti jaoks asuvad NODE_MODULES foldris
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
//var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://kert1122:Password1122@ds151941.mlab.com:51941/ea-projekt');
//var db = mongoose.connect;
var secure = require('./config/passport.js')
var axios = require('axios')

var port = process.env.PORT || 3000;
// Server
var app = express();
var routes = require('./routes/routes.js');
var User = require('./models/user.js')
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

// Valideerimine serverist
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

// Sisselogimine salasõnaga
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


// Need on ühendused
app.get('/',routes.homeGet);
app.get('/login',routes.loginGet);
app.post('/login',passport.authenticate('local',{sucessRedirect:'/',failureRedirect:'/login'}),routes.loginPost);
app.get('/register',routes.registerGet);
app.post('/register',routes.registerPost);
app.get('/logout',routes.logout);
app.get('/dashboard',secure.isAuthorized,routes.dashboard);
app.get('/play',secure.isAuthorized,routes.playGet);
app.get('/userscore',secure.isAuthorized,routes.userscore);
app.post('/updatePost',secure.isAuthorized,routes.updatePost);
app.get('*',routes.notFound);

// Serveri port
app.listen(port,function(){
  console.log('App running on port ' + port);
})
