var mongoose = require("mongoose");

var sectionSchema = new mongoose.Schema({
	parentCourse: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "Course"
	},
	professor: String,
	location: String,
	GPA: Number,
	open: Boolean,
	time: String
});

module.exports = mongoose.model("Section", sectionSchema);