const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
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
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cel: String,
  accounts: [
    {
      type: Schema.ObjectId,
      ref: "Account"
    }
  ]
  /*
  groups: [
    {
      type: Schema.ObjectId,
      ref: "Group"
    }
  ],
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

const model = mongoose.model("User", mySchema);
module.exports = model;
