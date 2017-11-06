var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


// MONGOOSE SET UP
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/animals");

var dogSchema = new mongoose.Schema({
    name: String,
    img: String,
    gender: String,
    age: Number,
    description: String,
    listed: String
});

var Dog = mongoose.model("Dog", dogSchema);

var catSchema = new mongoose.Schema({
    name: String,
    img: String,
    gender: String,
    age: Number,
    description: String,
    listed: String
});

var Cat = mongoose.model("Cat", catSchema);

// Cat.create({
//     name: "Florence",
//     img: "https://i.ytimg.com/vi/pHQvp7BFokc/hqdefault.jpg",
//     gender: "Female",
//     age: 4,
//     description: "Florence is a very pretty cat, with a great sense of style.  Whether you want cuddles all day or a companion that you can discuss fashion with, Florence is the cat for you.",
//     listed: "4 May 2017"
// }, function(err, newCat) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("A new cat was saved.");
//     }
// });

// Dog.create({
//     name: "Katy",
//     img: "https://www.what-dog.net/Images/faces2/scroll001.jpg",
//     gender: "Female",
//     age: 1,
//     description: "This is Katy, she is a very boistrous, big dog.",
//     listed: "5 May 2017"
// }, function(err, newlyCreated) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("A new dog was saved!");
//     }
// });


// ROUTES

app.get("/", function(req, res) {
   res.render("index"); 
});

// app.get("/", function(req, res) {
//     res.render("index");
// });

app.get("/about", function(req, res) {
    res.render("about");
});


app.get("/contact", function(req, res) {
   res.render("contact"); 
});

app.get("/team", function(req, res) {
    res.render("team");
});

app.get("/adopt", function(req, res) {
    res.render("adopt");
});

// The dogs routes

app.get("/adopt/dogs", function(req, res) {
    Dog.find({}, function(err, allDogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("dogs", {dogs: allDogs});
        }
    });
});

app.post("/adopt/dogs", function(req, res) {
    var newDog = req.body.dog;
    
    Dog.create(newDog, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt");
        }
    });
});

app.get("/adopt/dogs/new", function(req, res) {
    res.render("new");
});

app.get("/adopt/dogs/:id", function(req, res) {
   Dog.findById(req.params.id, function(err, foundDog) {
       if(err) {
           console.log(err);
       } else {
           res.render("showdogs", {dog: foundDog});
       }
   });
});

app.get("/adopt/dogs/:id/edit", function(req, res) {
    Dog.findById(req.params.id, function(err, foundDog) {
        if(err) {
            console.log(err);
        } else {
            res.render("editdogs", {dog: foundDog});
        }
    });
});

app.put("/adopt/dogs/:id", function(req, res) {
    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/dogs/" + req.params.id);
        }
    });
});

app.delete("/adopt/dogs/:id", function(req, res) {
    Dog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/dogs");
        }
    });
});



app.get("/adopt/enquire", function(req, res) {
   res.render("enquire"); 
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});