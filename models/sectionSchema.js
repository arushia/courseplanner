var mongoose = require("mongoose");

var sectionSchema = new mongoose.Schema({
	parentCourse: { //loop through courses to create this
		type: mongoose.Schema.Types.ObjectID,
		ref: "Course"
	},
	//using connected course ID, create a string lie "CS 225" to search
	//through cascading courses to find matching one,
	//then loop through DetailedSections

 //meetings - meeting - instructors - loop instructor
	professors: [{
		type: String
	}],
	location: String, 	//meetings - meeting  -buildingName
	GPA: Number, //hardcoded for now? not sure on this one
	open: Boolean, // need to find where to get this info
	timestart: String  //meetings - meetings  - start and end
	timeend: String
});

module.exports = mongoose.model("Section", sectionSchema);
