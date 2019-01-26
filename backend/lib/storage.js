const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/prm");
const db = mongoose.connection;
db.on("error", () => console.error("connection error"));
db.once("open", () => {
  console.log("We are connected");
});
db.on("data", data => {
  console.log(data);
});

module.exports = db;
