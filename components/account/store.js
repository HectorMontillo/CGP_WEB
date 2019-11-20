const Model = require("./model");
const userModel = require("../user/model");
const groupModel = require("../group/model");

function listAccounts(query, idUser) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    userModel
      .find(filter)
      .populate("accounts")
      .exec((err, data) => {
        if (err) {
          rejec(err);
        } else {
          resolve(data[0].accounts);
        }
      });
  });
}

function addAccount(account, idUser, idGroup) {
  return new Promise((resolve, rejec) => {
    const myAccount = new Model(account);
    myAccount
      .save()
      .then(data => {
        updateUserAccounts(idUser, data._id)
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

function updateUserAccounts(idUser, newIdAccount) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idGroup) {
      filter = {
        _id: idGroup
      };
    }
    groupModel
      .findOneAndUpdate(filter, { $push: { accounts: newIdAccount } })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

function updateGroupAccounts(idGroup, newIdAccount) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idUser) {
      filter = {
        _id: idUser
      };
    }
    userModel
      .findOneAndUpdate(filter, { $push: { accounts: newIdAccount } })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

module.exports = {
  listAccounts,
  addAccount
};
