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
  return new Promise((resolve, rejec) => {
    const myUser = new Model(user);
    return myUser
      .save()
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        console.log(e);
        if (e.name == "MongoError" && e.code == "11000") {
          rejec(
            "Occurrió un error inesperado, comunicate con el soporte técnico!!"
          );
        } else {
          rejec(e);
        }
      });
  });
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
