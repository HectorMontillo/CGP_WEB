const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  value: Number
});

const model = mongoose.model("Transaction", mySchema);
module.exports = model;
