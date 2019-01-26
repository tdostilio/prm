const express = require("express");
const app = express();
const Contact = require("../schema/contact");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "hello world"
  });
});

app.get("/contacts", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "hello world"
  });
});

app.post("/contact", async (req, res) => {
  if (!req.body.name) {
    throw new Error("No name provided");
  }
  let newContact = new Contact({
    name: req.body.name,
    relationship: req.body.relationship,
    lastContact: Date.now()
  });
  await newContact.save(err => {
    if (err) {
      throw new Error(`Error saving contact`);
    }
  });
  console.log(newContact);
  res.status(200).send({
    success: "true",
    message: newContact.name
  });
});

module.exports = app;
