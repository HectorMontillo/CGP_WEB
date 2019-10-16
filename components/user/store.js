//const mongoose = require("mongoose");
const Model = require("./model");

function listUsers() {
  return Model.find();
}

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

module.exports = {
  listUsers,
  addUser
};