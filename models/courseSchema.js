var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
	college: String,
	number: Number,
	creditHours: Number,
	avgGPA: Number,
	generalLocation: [{
		type: String
	}],
	prerequisites: [{
		type: mongoose.Schema.Types.ObjectID,
		ref: "Course"
	}],
	required: Boolean,
	requirementsTags:  [{
		type: String
	}]
});

module.exports = mongoose.model("Course", courseSchema);