var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
	college: String, //ns2:subject - label
	abrCollege: String, //ns2:subject - $ - id
	 // ns2:subject - cascadingCourses - loop through CascadingCourse
	CourseName: String, //label
	CourseDescription: String, //description
	number: Number, // detailedSection - parents - course - $ - id
	creditHours: Number, //creditHours
	avgGPA: Number, //hard coded
	generalLocation: [{
		type: String
	}],
	prerequisites: String, //CourseSectionInformation
	// prerequisites: [{
	// 	type: mongoose.Schema.Types.ObjectID,
	// 	ref: "Course"
	// }],
	required: Boolean,
	requirementsTags:  [{
		type: String
	}]
});

module.exports = mongoose.model("Course", courseSchema);
