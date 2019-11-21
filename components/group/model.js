const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  colors: {
    start: Number, // Color inicio del bg del grupo
    end: Number // Color final del bg del grupo
  },
  accounts: [
    {
      type: Schema.ObjectId,
      ref: "Account"
    }
  ],
  currency: {
    type: Schema.ObjectId,
    ref: "Currency"
  },
  balance: Number
});

const model = mongoose.model("Group", mySchema);
module.exports = model;
