const express = require("express");
const res = require("express/lib/response");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
var configDB = require("./config/database.js");

mongoose.connect(configDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { render } = require("ejs");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Test Connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successful");
});

const quotesCollection = db.collection("quotes");

// Get Request
app.get("/", (req, res) => {
  //   res.sendFile(__dirname + "/index.html");

  //   Fetching collections from the server

  quotesCollection
    .find()
    .toArray()
    .then((quotes) => res.render("index.ejs", { quotes: quotes }))
    .catch((error) => console.log(error));
});

app.post("/quotes", (req, res) => {
  //   console.log("We are in the quotes section");
  // Reading the form data
  console.log(req.body);
  //   Inserting to the database

  quotesCollection
    .insertOne(req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

app.put("/quotes", (req, res) => {
  console.log("We are here in the put section ");
  //   console.log(req.body.quote);

  // Update command
  quotesCollection
    .findOneAndUpdate(
      {
        name: "Hello",
      },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => res.json("Success"))
    .catch((error) => console.error(error));
});

// Start the server
app.listen(3000);
