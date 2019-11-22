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

function getGroup(idGroup) {
  return new Promise((resolve, rejec) => {
    let filter = {
      _id: idGroup ? idGroup : ""
    };
    Model.find(filter)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
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
            /*
            calcBalanceForAdd(data._id)
              .then(balance => {
                updateGroup(data._id, {
                  balance: balance
                })
                  .then(gr => {
                    resolve(gr);
                  })
                  .catch(e => {
                    rejec(e);
                  });
              })
              .catch(e => {
                rejec(e);
              });*/
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

function calcBalanceForAdd(idGroup) {
  return new Promise((resolve, rejec) => {
    myGroup
      .find({
        _id: idGroup
      })
      .populate("accounts")
      .exec((err, data) => {
        if (err) {
          console.log("hola" + err);
          rejec(err);
        } else {
          let acc = data[0].accounts;
          let bal = 0;
          acc.forEach(ele => {
            bal += acc.savingAccount.balance;
          });
          console.log("balance" + bal);
          resolve(bal);
        }
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

function updateGroup(idGroup, updateData) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idGroup) {
      filter = {
        _id: idGroup
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

function deleteGroup(idGroup, idUser) {
  return new Promise((resolve, rejec) => {
    let filterUser = {
      _id: idUser
    };
    userModel
      .update(filterUser, { $pullAll: { groups: [idGroup] } })
      .then(data => {
        Model.findOneAndDelete({ _id: idGroup })
          .then(data => {
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
module.exports = {
  listGroups,
  addGroup,
  getGroup,
  updateGroup,
  deleteGroup
};
