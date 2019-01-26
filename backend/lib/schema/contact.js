const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  lastContact: Date
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
