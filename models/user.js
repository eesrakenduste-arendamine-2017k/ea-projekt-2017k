// kasutajamudel andmebaasi jaoks

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	password:{
		type:String
	},
	email:{
		type:String	
	},
	name:{
		type:String	
	},
	user_score:{
		type:Number
	},
	comp_score:{
		type:Number
	},
	draw:{
		type:Number
	}
});

var User = module.exports = mongoose.model('User',UserSchema);

// loob kasutaja
module.exports.createUser = function (newUser,cb) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(cb)
	    });
	});
}

// kontrollib kasutajanime järgi
module.exports.getUserByUserName = function(username,cb){
	var query = {username:username};
	User.findOne(query,cb);
};

// kontrollib kasutajat ID järgi
module.exports.getUserById = function(id,cb){
	User.findById(id,cb);
}

// uuendab skoori andmetabelis
module.exports.UpdateScore = function(username,user_s,draw_s,comp_s,cb){
	var query = {username:username};
	console.log(query);
	User.findOneAndUpdate(query, {$set:{user_score:user_s,comp_score:comp_s,draw:draw_s}}, {upsert:true},function(err,data){
		if(err) throw err;
		cb(null,data);
	})
}

// kontrollib sisselogimise parooli
module.exports.comparePassword = function(inputPassword,hash,cb){
	bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    	if (err) throw err;
    	cb(null,isMatch);
	});
}