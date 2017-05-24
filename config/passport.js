var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

// vaatab kas kasutaja on andmebaasis olemas ja vaatab logini
module.exports.authLogin = passport.use(new localStrategy(
  function(username, password, done) {
    User.getUserByUserName(username,function(err,user){
      if(err) throw err;
      if(!user){
          return done(null, false, { message: 'Incorrect username.' });
        }

        User.comparePassword(password,user.password,function(err,isMatch){
          if (err) throw err;
          if(isMatch){
            return done(null,user)
          } else{
            return done(null,false,{message:'Invalid Password'})
          }
        });
    })
  }
));

// kontrollib kas kasutajal on õigused faili vaatamiseks
module.exports.isAuthorized = function(req, res, next) {
    if (req.user == null)
    {
        res.redirect('/login');
    }
    next(); 
};
