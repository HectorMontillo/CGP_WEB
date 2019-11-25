const mongoose = require("mongoose");
const accountSchema = require("../account/model");
const groupSchema = require("../group/model");

const Schema = mongoose.Schema;
const schema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  doc: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cel: String,
  accounts: [accountSchema],

  groups: [groupSchema]
  /*
  budgets: [
    {
      type: Schema.ObjectId,
      ref: "Budget"
    }
  ],
  transactions: [
    {
      type: Schema.ObjectId,
      ref: "Transaction"
    }
  ]*/
});

const model = mongoose.model("User", schema);
module.exports = {
  model,
  schema
};
