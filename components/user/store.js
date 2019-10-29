//const mongoose = require("mongoose");
const Model = require("./model");

function listUsers(query) {
  return new Promise((resolve, rejec) => {
    Model.find(query)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

function getUser(idUser) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    Model.find(filter)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

function updateUser(idUser, updateData) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    Model.findOneAndUpdate(filter, { $set: updateData }, { new: true })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

function deleteUser(idUser) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    Model.findOneAndDelete(filter)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}
module.exports = {
  listUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser
};
