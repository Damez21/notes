//
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

//Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//Setting The Server Up
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Middleware
app.use(express.static("./develop/public"));


//Api Route / GET 
app.get("/api/notes", function(req,res) {
    readFileAsync("./develop/db/db.json", "uft8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// HTML

app.get("/notes", function(req,res) {
    res.sendFile(path.joint(__dirname, "./develop/public/notes.html"));
});

app.get("/", function(req,res) {
    res.sendFile(path.joint(__dirname, "./develop/public/index.html"));
});

app.get("*", function(req,res) {
    res.sendFile(path.joint(__dirname, "./develop/public/index.html"));
});




//Listen
app.listen(PORT, function() {
    console.log("App Listening on PORT " + PORT);
});