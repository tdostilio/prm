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
  let newContact = await Contact.createContact(req.body);
  res.status(200).send({
    success: "true",
    body: newContact
  });
});

// Read an existing contact
app.get("/contact/:id", async (req, res) => {
  let contact;
  try {
    contact = await Contact.getContact(req.params);
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
    let contact = await Contact.updateContact(req.params);
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
    await Contact.deleteContact(req.params);
  } catch (err) {
    res.status(500).send(`Error deleting contact: ${err}`);
  }
  res.status(200).send({
    body: "completed"
  });
});

module.exports = app;
