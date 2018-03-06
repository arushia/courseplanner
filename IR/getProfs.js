var fs = require('fs')
var mongoose = require("mongoose");
var course = require("../models/courseSchema");
var section   = require("../models/sectionSchema");

function profArray(){
  var profs = []
  // console.log("here12")
  // const queryAllSections = () => {
  //   console.log("here0")
  //   //Where User is you mongoose user model
  //   section.find({} , (err, sections) => {
  //       if(err) {console.log(err)}
  //       sections.map(sec => {
  //           console.log("here")
  //           sec.professors.forEach(function(ele){
  //             console.log("here1")
  //             profs.push(ele)
  //             console.log(ele)
  //           })
  //       })
  //   })
  // }
  var cursor = section.find({},(err,sections) => {
    sections.forEach(function(ele){
      ele.professors.forEach(function(prof){
        profs.push(prof)
        //console.log(prof)
      })
    })
  })
  console.log(profs)
  return profs
}


module.exports = profArray;
