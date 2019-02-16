const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  relationship: String,
  lastContact: Date
});

const Contact = mongoose.model("Contact", contactSchema);

Contact.createContact = async function(params = {}) {
  let newContact = await Contact.create({
    name: params.name,
    relationship: params.relationship,
    lastContact: Date.now()
  });
  try {
    await newContact.save();
    return newContact;
  } catch (err) {
    throw err;
  }
};

Contact.getContact = async function(params = {}) {
  if (!params.id) {
    throw new Error("No contact ID provided");
  }
  try {
    let contact = await Contact.findById(params.id);
    return contact;
  } catch (err) {
    throw err;
  }
};

Contact.updateContact = async function(params = {}) {
  if (!params) {
    throw new Error("No params provided: exiting");
  }
  try {
    let updateFields = Object.keys(params);
    for (field of updateFields) {
      contact.field = field;
    }
    await contact.save();
  } catch (err) {
    throw err;
  }
};

Contact.deleteContact = async function(params = {}) {
  try {
    await Contact.findByIdAndDelete(params.id);
  } catch (err) {
    throw err;
  }
};

module.exports = Contact;
