  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  lastname: String,
  doc: String,
  email: String,
  ie: String,
  password: String
});

const model = mongoose.model("User", mySchema);
module.exports = model;

