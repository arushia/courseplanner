var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
	college: String, //ns2:subject - label
	abrCollege: String, //ns2:subject - $ - id
	 // ns2:subject - cascadingCourses - loop through CascadingCourse
	CourseName: String, //label
	CourseDescription: String, //description
	Scheduling: String, //classScheduleInformation
	number: Number, // detailedSection - parents - course - $ - id
	creditHours: Number, //creditHours
	avgGPA: Number, //hard coded
	//use lecture locations. loop through each detailedSection to see if
	//meetings - type - code - LEC exist, if so choose meetings - building name to list
	generalLocation: [{
		type: String
	}],
	CourseInfo: String, //CourseSectionInformation
	InfoCourses: [{ // - can try to use regex for couse list from course info
		type: mongoose.Schema.Types.ObjectID,
		ref: "Course"
	}],
	required: Boolean, // may have to get data from another source??
	//loop through gened categories if it exist, and for each category found
	//use category - ns2:genEdAttributes-genEdAttribute
	requirementsTags:  [{
		type: String
	}]
});

module.exports = mongoose.model("Course", courseSchema);
