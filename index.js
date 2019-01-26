const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/prm");
const db = mongoose.connection;
db.on("error", () => console.error("connection error"));
db.once("open", () => {
  console.log("Were connected");
});

const contactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  lastContact: Date
});

const Contact = mongoose.model("Contact", contactSchema);

// create a contact
let dad = new Contact({
  name: "Dad",
  relationship: "close-family",
  lastContact: new Date()
});

console.log(dad.name);
dad.save();

// contact notification
if (Date.now() > dad.lastContact) {
  console.log("Call your father!");
} else {
  console.log("Dont need to call");
}
