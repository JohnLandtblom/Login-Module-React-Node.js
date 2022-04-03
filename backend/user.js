const mongoose = require("mongoose");

const user = new mongoose.Schema({
  // Defines the strukture of the document containing user details
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

module.exports = mongoose.model("User", user); // User now containing the abowe structure
