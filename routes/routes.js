var User = require('../models/user.js');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// home ühendused
exports.homeGet =  function(req,res) {
	res.render('home',{
		title : "Welcome",
	});
};

// registreerimise ühendus
exports.registerGet =  function(req,res) {
	res.render('register',{
		title : "Register Here",
		errors:""
	});
};

// loob uue kasutaja
exports.registerPost =  function(req,res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var pass = req.body.password;
	var pass2 = req.body.confpass;

	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','email is required').notEmpty();
	req.checkBody('email','Provide proper email').isEmail();
	req.checkBody('username','Name is required').notEmpty();
	req.checkBody('password','password is required').notEmpty();
	req.checkBody('confpass','Password not matching').equals(pass);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
		title : "Registration failed",
		errors:errors
	});
	} else {
		var newUser = new User({
			name:name,
			email:email,
			username:username,
			password:pass,
			user_score:0,
			comp_score:0,
			draw:0
		});

		User.createUser(newUser,function(err,user){
			if(err) throw err;
			console.log(user);
		});

		res.redirect('/login')
	}	
};

// login leht
exports.loginGet =  function(req,res) {
	res.render('login',{
		title : "Sign In Here",
	});
};

// mängu leht
exports.playGet = function(req,res){
	res.render('play',{
		title: "TIC TAC TOE",
		user:req.user.name,
		user_score:req.user.user_score,
		comp_score:req.user.comp_score,
		draw:req.user.draw
	})
}


// ajax call skoori uuendamiseks
exports.userscore = function(req,res){
	 res.send({user_score:req.user.user_score,comp_score:req.user.comp_score,draw:req.user.draw});
}

// logib kasutaja sisse
exports.loginPost =  function(req,res) {
	res.redirect('/dashboard');
};

// UpdateScore andmebaasis
exports.updatePost =  function(req,res) {
	var user_s = req.body.user;
	var draw_s= req.body.draw;
	var comp_s = req.body.comp;
	User.UpdateScore(req.user.username,user_s,draw_s,comp_s,function(err,done){
		if (err) throw err;
		console.log(done);
	})
	
}

// kasutaja dashboard
exports.dashboard =  function(req,res) {
	res.render('dashboard',{
		title : "Welcome To the Dashboard",
		user:req.user.name,
		user_score:req.user.user_score,
		comp_score:req.user.comp_score,
		draw:req.user.draw
		});
};

// logib kasutaja välja
exports.logout = function(req,res){
	req.logout();
	req.flash('success_msg','Logged OUT');
	res.redirect('/');
};

// 404 leht
exports.notFound =  function(req,res) {
   res.send('404 Page not found');
};