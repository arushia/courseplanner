var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Course  = require("./models/courseSchema"),
    Section     = require("./models/sectionSchema"),
    User        = require("./models/userSchema"),
    seedDB      = require("./IR/JSONParser"),
    flash       = require("connect-flash"),
    path = require('path'),
    methodOverride = require("method-override")

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/courseRun");
mongoose.connect("mongodb://Mike:courserun@ds155288.mlab.com:55288/course-run")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
    secret: "Mike is a pretty cool person",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   // res.locals.error = req.flash("error");
   // res.locals.success = req.flash("success");
   next();
});

//seedDB();
// var profs = []
// Section.find({},(err,sections) => {
//   sections.forEach(function(ele){
//     ele.professors.forEach(function(prof){
//       profs.push(prof)
//       //console.log(prof)
//     })
//   })
// })
//
// var courses = []
// Course.find({},(err,courses) => {
//   courses.forEach(function(ele){
//     courses.push(ele.abrCollege + " "+ele.number)
//     //console.log(ele.abrCollege + " "+ele.number)
//   })
// })
//
// var colleges = []
// Course.find({},(err,courses) => {
//   courses.forEach(function(ele){
//     if(!colleges.includes(ele.abrCollege)){
//       colleges.push(ele.abrCollege)
//       //console.log(ele.abrCollege)
//     }
//   })
// })
//
// var courses = getCourses();
// while(!courses){
//   console.log("hi")
// }


app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/search", function(req, res){
  Section.find({},function(err, Sections){
    if(err){
      console.log(err.message)
    } else {
      res.render("search.ejs", {sections: Sections});
    }
  })

});
app.get("/register", function(req, res){
    res.render("register.ejs");
});

app.get("/results", function(req, res){
    var query = req.url
    var lg = 0
    if(query.indexOf("zero")!==-1) {
      lg = 0
    } else if(query.indexOf("one")!==-1) {
      lg = 1
    } else if(query.indexOf("two")!==-1){
      lg = 2
    } else if(query.indexOf("three")!==-1){
      lg = 3
    }
    var cs = query.indexOf("college=")+8;
    var ce = query.indexOf("professor=")-1;
    var colleges = query.substring(cs,ce)
    var ns = query.indexOf("num=")+4;
    var ne = query.indexOf("college=")-1;
    var numbert =  query.substring(ns,ne)
    var ps = query.indexOf("professor=")+10;
    var pe = query.length
    var professors = query.substring(ps,pe)
    professors = professors.replace("%2C", ",")
    professors = professors.replace("+", " ")
    if(colleges == "Choose..."){
      colleges = ""
    }
    if(professors == "Choose..."){
      professors = ""
    }
      // console.log(colleges)
      // console.log(number)
      // console.log(professors)
      // console.log(lg)
      // console.log(hg)
    // Section.find({},function(err,Courses){
    //   courses = []
    //   if(err){
    //     console.log(err.message)
    //   } else {
    //     Courses.forEach(function(course){
    //       var splitName = course.parent.split(" ")
    //       //console.log( splitName[0].indexOf(colleges) + " "+  course.professors.toString().indexOf(professors) + " "+  splitName[1].indexOf(number))
    //       if( splitName[0].indexOf(colleges)>-1 && course.professors.toString().indexOf(professors)>-1 && splitName[1].indexOf(number)>-1){
    //         console.log("searching " + course.parentCourse.toString())
    //         Course.findById(course.parentCourse, function(err,co){
    //           if(err){
    //             console.log(err.message)
    //           }
    //           if (!courses.includes(co) && (co.avgGPA == -1 || (co.avgGPA>lg && co.avgGPA < hg))) {
    //             console.log(!courses.includes(co))
    //             courses.push(co)
    //             console.log(co)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    if(numbert != ""){
      Course.find({avgGPA: { $gt : lg}, abrCollege: "CS" , number:numbert}, function(err,Courses){
        if(err){
          console.log(err.message)
        } else {
          console.log(Courses)
          res.render("results.ejs" , {courses : Courses});
        }
      })
    } else {
      Course.find({avgGPA: { $gt : lg}, abrCollege:"CS"}, function(err,Courses){
        if(err){
          console.log(err.message)
        } else {
          console.log(Courses)
          res.render("results.ejs" , {courses : Courses});
        }
    })
  }

});


app.get("/login", function(req, res){
    res.render("login.ejs");
});
app.get("/accountsetup/:id", function(req, res){
  Course.find({},function(err, Courses){
    if(err){
      console.log(err.message)
    } else {
      res.render("accountsetup.ejs", {user_id: req.params.id, courses: Courses});
    }
  })

});

app.post("/register", function(req, res){
    var newUser = new User({email: req.body.username, username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error", err.message);
            console.log(err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           //req.flash("success", "Welcome to CourseRun " + user.username+"!");
           res.redirect("/accountsetup/"+user.id);
        });
    });
});

app.put("/accountsetup/:id", function(req, res){
   User.findByIdAndUpdate(req.params.id, {address: req.body.street+" "+req.body.town+" "+req.body.state+" "+req.body.zip}, function(err, user){
      if(err){
          res.redirect("index");
      } else {
        if(req.body.taken){
          if(typeof(req.body.taken)=="string"){
              var splitName = req.body.taken.split(" ")
              Course.find({abrCollege:splitName[0], number:splitName[1]}, function(err,result){
                if(err){
                  console.log(err.message)
                } else {
                  if(result.length>0){
                    user.coursesTaken.push(result[0])
                    user.save()
                  }
                }
              })
          } else{
            req.body.taken.forEach(function(ele){
              var splitName = ele.split(" ")
              Course.find({abrCollege:splitName[0], number:splitName[1]}, function(err,result){
                if(err){
                  console.log(err.message)
                } else {
                  if(result.length>0){
                    user.coursesTaken.push(result[0])
                    user.save()
                  }
                }
              })
            })
          }
        }

        if(req.body.favorited){
          if(typeof(req.body.favorited)=="string"){
              var splitName = req.body.favorited.split(" ")
              Course.find({abrCollege:splitName[0], number:splitName[1]}, function(err,result){
                if(err){
                  console.log(err.message)
                } else {
                  if(result.length>0){
                    user.favoritesPlanned.push(result[0])
                    user.save()
                  }
                }
              })
          } else{
            req.body.favorited.forEach(function(ele){
              var splitName = ele.split(" ")
              Course.find({abrCollege:splitName[0], number:splitName[1]}, function(err,result){
                if(err){
                  console.log(err.message)
                } else {
                  if(result.length>0){
                    user.favoritesPlanned.push(result[0])
                    user.save()
                  }
                }
              })
            })
          }
        }
          res.redirect("/search");
      }
   });
});

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/search",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/")
   // req.flash("success", "Logged you out!");
   // res.redirect("/campgrounds");
});




app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

// app.listen(3000, function(){
//    console.log("The Server Has Started!");
// });

app.listen(process.env.PORT, process.env.IP);
