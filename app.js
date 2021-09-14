//jshint esversion:6

//require the needed packages
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

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

//connecting mongoose db
mongoose.connect("mongodb+srv://malley:kapuska742@cluster0.wk9ld.mongodb.net/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);


const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

//to get the main main list page
app.get("/", function (req, res) {

    Item.find({}, function (err, items) {
        if (err) {
            console.log(err);
        } else {

            //to see which items is inside of the results array
            items.forEach(item => {});
            res.render("list", {
                listTitle: "Today",
                newItems: items
            });
        }

    });
});

app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({
        name: customListName
    }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: []
                });

                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("list", {
                    listTitle: foundList.name,
                    newItems: foundList.items
                });
            }
        }

    });
});


//to post(get) the inputs from user and redirect page
app.post("/", function (req, res) {

    item = req.body.newItemToAdd;
    buttonPage = req.body.addedToList;
  
    const itemBuffer = new Item({
        name: item
    });

    if (item != "" && buttonPage === "Today") {
        if (item != "" && buttonPage === "Today") {

            itemBuffer.save();
            res.redirect("/");
        } else {
            res.redirect("/");
        }

    } else {
        if (item != "") {

            List.findOne({
                name: buttonPage
            }, function (err, foundList) {
                foundList.items.push(itemBuffer);
                foundList.save();
            });

            res.redirect("/" + buttonPage);
        } else {
            res.redirect("/" + buttonPage);
        }
    }
});



app.post("/delete", function (req, res) {

    const checkedItem = req.body.deletebox;
    const listName = req.body.listName;

    //selecting the which page we are in first and then selecting the item we wanna delete
    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItem, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({
            name: listName
        }, {
            $pull: {
                items: {
                    _id: checkedItem
                }
            }
        }, function (err, foundList) {
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//port to listen in browser
app.listen(port, function () {
    console.log("Server is running now..");
});
