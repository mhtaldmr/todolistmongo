//jshint esversion:6

//require the needed packages
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//calling the date.js file
const date = require(__dirname + "/date.js");

// to use express package
const app = express();
// to view the ejs engine
app.set('view engine', 'ejs');
//to use bodyparse or get the inputs from user
app.use(bodyParser.urlencoded({
    extended: true
}));
//to use the files in public; in this case css file
app.use(express.static("public"));

//variables to use
let item = "";
let items = [];
let workitems = [];

//to get the main list page
app.get("/", function (req, res) {

    //calling a function from date.js file
    let day = date.getDate();

    //how to render pages in ejs with key:value
    res.render("list", {
        listTitle: day,
        newItems: items
    });

});


//to create a work list page
app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newItems: workitems
    });
});


//to post(get) the inputs from user and redirect page
app.post("/", function (req, res) {

    //sending the written item to target page
    if (req.body.addList == "Work") {
        item = req.body.newTaskToDo;
        workitems.push(item);
        res.redirect("/work");
    } else {
        item = req.body.newTaskToDo;
        items.push(item);
        res.redirect("/");
    }
});

//port to listen in browser
app.listen(3000, function () {
    console.log("Server is running now..");
});