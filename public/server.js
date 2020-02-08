



// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



var db = require('../db/db.json');


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});


app.get("/api/notes", function (req, res) {
  return res.json(db);
});


app.delete("/api/notes/:id", function(req,res) {
  
  var newTable = req.body;
  res.json(newTable);
  
  db.splice(req.params.id, 1);
  
  fs.writeFile("../db/db.json", JSON.stringify(db), function (err) {

    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");

  });

})


app.post("/api/notes", function (req, res) {
 
  var newTable = req.body;


  console.log(newTable);

  

  res.json(newTable);
  db.push(newTable);
  fs.writeFile("../db/db.json", JSON.stringify(db), function (err) {

    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");

  });

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
