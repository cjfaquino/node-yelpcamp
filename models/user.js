const mongoose = require('mongoose'),
	  passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);