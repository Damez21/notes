
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./develop/public"));

app.get("/api/notes", function(req,res) {
    readFileAsync("./develop/db/db.json", "uft8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});
