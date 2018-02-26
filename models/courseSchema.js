var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
	college: String, //ns2:subject.label[0]
	abrCollege: String, //ns2:subject.$.id
	 // ns2:subject.cascadingCourses.cascadingCourse
	CourseName: String, //label[0]
	CourseDescription: String, //description
	Scheduling: String, //classScheduleInformation
	number: Number, // detailedSections - detailedSection - parents - course - $ - id
	creditHours: String, //creditHours - will use regex to parse
	avgGPA: Number, //hard coded
	//use lecture locations. loop through each detailedSections - detailedSection to see if
	//meetings -meeting - type - code - LEC exist, if so choose meetings - meeting - building name to list
	generalLocation: [{
		type: String
	}],
	CourseInfo: String, //courseSectionInformation
	InfoCourses: [{ // - can try to use regex for couse list from course info
		type: mongoose.Schema.Types.ObjectID,
		ref: "Course"
	}],
	required: Boolean, // may have to get data from another source??
	//loop through genEdCategories if it exist, and for each category found
	//use category - ns2:genEdAttributes-genEdAttribute - "-"
	requirementsTags:  [{
		type: String
	}]
});

module.exports = mongoose.model("Course", courseSchema);
