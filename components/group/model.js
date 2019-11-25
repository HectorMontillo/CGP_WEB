const mongoose = require("mongoose");
const accountSchema = require("../account/model").schema;
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  colors: {
    start: Number, // Color inicio del bg del grupo
    end: Number // Color final del bg del grupo
  },
  accounts: [accountSchema],
  currency: {
    type: Schema.ObjectId,
    ref: "Currency"
  },
  balance: Number
});

//const model = mongoose.model("Group", schema);
module.exports = schema;
