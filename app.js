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
    res.render("search.ejs");
});
app.get("/register", function(req, res){
    res.render("register.ejs");
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
app.get("/results/:lg/:hg/:colleges/:number/:professors", function(req, res){
    res.render("course.ejs");
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




// app.get("/", function(req, res){
//     res.render("home");
// });
//
// app.get("/about", function(req, res){
//     res.render("about");
// });
//
app.listen(3000, function(){
   console.log("The Server Has Started!");
});

//app.listen(process.env.PORT, process.env.IP);
