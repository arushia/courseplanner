var fs = require('fs')

fs.readFile('Files/2018Data.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    x=0
    var obj = JSON.parse(data);
    college = obj["ns2:subject"]["label"][0]
    abrCollege = obj["ns2:subject"]["$"]["id"]
    listOfCourses = obj["ns2:subject"]["cascadingCourses"][0]["cascadingCourse"]
    courseName = listOfCourses[x]["label"][0]
    courseDescription = listOfCourses[x]["description"][0]

    scheduling = []
    try{
        scheduling = listOfCourses[x]["classScheduleInformation"][0] // I think this is different for 2017
    }
    catch(error){}
    number = listOfCourses[x]["detailedSections"][0]["detailedSection"][0]["parents"][0]["course"][0]["$"]["id"]
    creditHours = listOfCourses[x]["creditHours"][0]
    avgGpa = 3.1 //hardcoded
    generalLocations = listOfCourses[x]["detailedSections"][0]["detailedSection"][0]["meetings"][0]["meeting"][0]["buildingName"]
    courseInfo = listOfCourses[x]["courseSectionInformation"];
    InfoCourses = [] // to be completed later
    required = true // where to get required from?
    requirementTags = []
    if(listOfCourses[x]["genEdCategories"]!=undefined){
        listOfCourses[x]["genEdCategories"].forEach(function(ele){
          requirementTags.push(ele["category"][0]["description"][0])
        })
    }
    //sectionInfo
    i=4
    sections = listOfCourses[x]["detailedSections"][0]["detailedSection"]
    //parent will be added when mongoose is implemented
    term = sections[i]["parents"][0]["term"][0]["_"]
    professors = []
    sections[i]["meetings"][0]["meeting"][0]["instructors"][0]["instructor"].forEach(function(ele){
      professors.push(ele["_"])
    })
    location = sections[i]["meetings"][0]["meeting"][0]["buildingName"][0] + " "+sections[i]["meetings"][0]["meeting"][0]["roomNumber"][0]
    GPA = 3.1 //TODO
    open = sections[i]["enrollmentStatus"][0]
    timestart = sections[i]["meetings"][0]["meeting"][0]["start"][0]
    timeend = sections[i]["meetings"][0]["meeting"][0]["end"][0]
    days = sections[i]["meetings"][0]["meeting"][0]["daysOfTheWeek"][0]
    type = sections[i]["meetings"][0]["meeting"][0]["type"][0]["_"]
    section = sections[i]["sectionNumber"][0]
    console.log(location)
});
