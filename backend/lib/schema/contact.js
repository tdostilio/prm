const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  lastContact: Date
});

const Contact = mongoose.model("Contact", contactSchema);

Contact.methods.createContact = async (params = {}) => {
  let newContact = new Contact({
    name: params.name,
    relationship: params.relationship,
    lastContact: Date.now()
  });
  try {
    await newContact.save();
  } catch (err) {
    throw err;
  }
};

Contact.methods.getContact = async (params = {}) => {
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

Contact.methods.updateContact = async (params = {}) => {
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

Contact.methods.deleteContact = async (params = {}) => {
  try {
    await Contact.findByIdAndDelete(params.id);
  } catch (err) {
    throw err;
  }
};

module.exports = Contact;
