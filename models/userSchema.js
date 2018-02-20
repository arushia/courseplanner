var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	password: String,
	email : String,
	coursesTaken: [{
		type: mongoose.Schema.Types.ObjectID,
		ref: "Courses"
	}],
	favoritesPlanned: [{
		type: mongoose.Schema.Types.ObjectID,
		ref: "Courses"
	}],
	address: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
