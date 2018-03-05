var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Course  = require("./models/courseSchema"),
    Section     = require("./models/sectionSchema"),
    User        = require("./models/userSchema");
    seedDB      = require("./IR/JSONParser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/courseRun");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();
app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

// app.listen(process.env.PORT, process.env.IP);app.listen(3000, function(){
//    console.log("The Server Has Started!");
// });

app.listen(process.env.PORT, process.env.IP);
