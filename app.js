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

// Dog set up

var dogSchema = new mongoose.Schema({
    name: String,
    img: String,
    gender: String,
    age: Number,
    description: String,
    listed: String
});

var Dog = mongoose.model("Dog", dogSchema);

// Cat set up

var catSchema = new mongoose.Schema({
    name: String,
    img: String,
    gender: String,
    age: Number,
    description: String,
    listed: String
});

var Cat = mongoose.model("Cat", catSchema);


//Other animals set up

var otherSchema = new mongoose.Schema({
    name: String,
    species: String,
    img: String,
    gender: String,
    age: Number,
    description: String,
    listed: String
});

var Other = mongoose.model("Other", otherSchema);


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


app.get("/volunteer", function(req, res) {
    res.render("volunteer");
});


app.get("/adopt/enquire", function(req, res) {
   res.render("enquire"); 
});

app.get("/application", function(req, res) {
    res.render("application");
});

// The dogs routes

app.get("/adopt/dogs", function(req, res) {
    Dog.find({}, function(err, allDogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("dogs/dogs", {dogs: allDogs});
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
    res.render("dogs/new");
});

app.get("/adopt/dogs/:id", function(req, res) {
   Dog.findById(req.params.id, function(err, foundDog) {
       if(err) {
           console.log(err);
       } else {
           res.render("dogs/showdogs", {dog: foundDog});
       }
   });
});

app.get("/adopt/dogs/:id/edit", function(req, res) {
    Dog.findById(req.params.id, function(err, foundDog) {
        if(err) {
            console.log(err);
        } else {
            res.render("dogs/editdogs", {dog: foundDog});
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

// Cat routes

app.get("/adopt/cats", function(req, res) {
    Cat.find({}, function(err, allCats) {
        if(err) {
            console.log(err);
        } else {
            res.render("cats/cats", {cats: allCats});
        }
    });
});

app.post("/adopt/cats", function(req, res) {
    var newCat = req.body.cat;
    
    Cat.create(newCat, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/cats");
        }
    });
});

app.get("/adopt/cats/new", function(req, res) {
    res.render("cats/new");
});

app.get("/adopt/cats/:id", function(req, res) {
   Cat.findById(req.params.id, function(err, foundCat) {
       if(err) {
           console.log(err);
       } else {
           res.render("cats/showcats", {cat: foundCat});
       }
   });
});

app.get("/adopt/cats/:id/edit", function(req, res) {
    Cat.findById(req.params.id, function(err, foundCat) {
        if(err) {
            console.log(err);
        } else {
            res.render("cats/editcats", {cat: foundCat});
        }
    });
});

app.put("/adopt/cats/:id", function(req, res) {
    Cat.findByIdAndUpdate(req.params.id, req.body.cat, function(err, updatedCat) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/cats/" + req.params.id);
        }
    });
});

app.delete("/adopt/cats/:id", function(req, res) {
    Cat.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/cats");
        }
    });
});


// Other animals routes

app.get("/adopt/others", function(req, res) {
    Other.find({}, function(err, allOthers) {
        if(err) {
            console.log(err);
        } else {
            res.render("others/others", {others: allOthers});
        }
    });
});

app.post("/adopt/others", function(req, res) {
    var newOther = req.body.other;
    
    Other.create(newOther, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt");
        }
    });
});

app.get("/adopt/others/new", function(req, res) {
    res.render("others/new");
});

app.get("/adopt/others/:id", function(req, res) {
  Other.findById(req.params.id, function(err, foundOther) {
      if(err) {
          console.log(err);
      } else {
          res.render("others/showothers", {other: foundOther});
      }
  });
});

app.get("/adopt/others/:id/edit", function(req, res) {
    Other.findById(req.params.id, function(err, foundOther) {
        if(err) {
            console.log(err);
        } else {
            res.render("others/editothers", {other: foundOther});
        }
    });
});

app.put("/adopt/others/:id", function(req, res) {
    Other.findByIdAndUpdate(req.params.id, req.body.other, function(err, updatedOther) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/others/" + req.params.id);
        }
    });
});

app.delete("/adopt/others/:id", function(req, res) {
    Other.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/adopt/others");
        }
    });
});


// Enquire routes




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});