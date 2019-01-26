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

// Create new contact
app.post("/contact", async (req, res) => {
  if (!req.body.name || !req.body.relationship) {
    res.status(404).send("Missing parameters");
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

// Read an existing contact
app.get("/contact/:id", async (req, res) => {
  let contact;
  try {
    contact = await Contact.find({ _id: req.params.id }, err => {
      if (err) {
        res.status(500).send("Server error");
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }

  res.status(200).send({
    body: contact
  });
});

// Update an existing contact
app.put("/contact/:id", async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    contact.name = req.body.name;
    contact.save();
  } catch (err) {
    res.status(500).send(`Error updating contact: ${err}`);
  }
  res.status(200).send({
    body: "completed"
  });
});

app.delete("/contact/:id", async (req, res) => {
  try {
    let contact = await Contact.findByIdAndDelete(req.params.id);
    contact.name = req.body.name;
    contact.save();
  } catch (err) {
    res.status(500).send(`Error updating contact: ${err}`);
  }
  res.status(200).send({
    body: "completed"
  });
});

module.exports = app;
