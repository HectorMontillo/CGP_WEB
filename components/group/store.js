const Model = require("./model");
const userModel = require("../user/model");

function listGroups(query, idUser) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    userModel
      .find(filter)
      .populate("groups")
      .exec((err, data) => {
        if (err) {
          rejec(err);
        } else {
          resolve(data[0].groups);
        }
      });
  });
}

function addGroup(group, idUser) {
  return new Promise((resolve, rejec) => {
    const myGroup = new Model(group);
    myGroup
      .save()
      .then(data => {
        updateUserGroups(idUser, data._id)
          .then(update => {
            resolve(data);
          })
          .catch(e => {
            rejec(e);
          });
      })
      .catch(e => {
        rejec(e);
      });
  });
}

function updateUserGroups(idUser, newIdGroup) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    userModel
      .findOneAndUpdate(filter, { $push: { groups: newIdGroup } })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

module.exports = {
  listGroups,
  addGroup
};
