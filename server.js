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


//Api Route / POST
app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id =notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});


//Api route / Delete
app.delete("/api/notes/:id", function(req, res) {
    const idDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
    })
})



//Listen
app.listen(PORT, function() {
    console.log("App Listening on PORT " + PORT);
});