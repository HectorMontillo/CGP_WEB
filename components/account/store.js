const accountShema = require("./model");
const userModel = require("../user/model").model;

function listAccounts(query, idUser) {
  return new Promise((resolve, rejec) => {
    userModel
      .find({ _id: idUser }, "accounts")
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}

async function addAccount(account, idUser, idGroup) {
  return new Promise((resolve, rejec) => {
    try{
      const data = await userModel.update(
        { _id: idUser}, 
        { $push: { accounts:  new accountShema(account)} }
        );
      resolve(data)
    }catch(e){
      rejec(e)
    }
  });
}

/*
function addAccount(account, idUser, idGroup) {
  return new Promise((resolve, rejec) => {
    const myAccount = new Model(account);
    myAccount
      .save()
      .then(data => {
        updateUserAccounts(idUser, data._id)
          .then(update => {
            console.log("Resolví UpdateUserAcc");
            resolve(data);
          })
          .catch(e => {
            console.log("Reject UpdateUserAcc " + e);
            rejec(e);
          });
      })
      .catch(e => {
        console.log("Reject Saving");
        rejec(e);
      });
  });
}
*/

/*
function updateGroupAccounts(idGroup, newIdAccount) {
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
        console.log("Resolví UpdateUserAcc in");
        resolve(data);
      })
      .catch(e => {
        console.log("Reject UpdateUserAcc in " + e);
        rejec(e);
      });
  });
}*/

/*
function updateUserAccounts(idUser, newIdAccount) {
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
}*/
//Es necesario modificar hacia atras argumento idUser
function updateAccount(idUser, idAccount, updateData) {
  return new Promise((resolve, rejec) => {
    Model.findOneAndUpdate(
      {_id: idUser, "accounts._id": idAccount}, 
      { $set: {
        "accounts.$": updateData
      } })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        if (e.name == "MongoError" && e.code == "11000") {
          rejec("Ya existe una cuenta con el mismo nombre!!");
        } else {
          rejec(e);
        }
      });
  });
}
/*
function updateAccount(idAccount, updateData) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idAccount) {
      filter = {
        _id: idAccount
      };
    }
    Model.findOneAndUpdate(filter, { $set: updateData }, { new: true })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        if (e.name == "MongoError" && e.code == "11000") {
          rejec("Ya existe una cuenta con el mismo nombre!!");
        } else {
          rejec(e);
        }
      });
  });
}*/
function deleteAccount(idAccount, idUser) {
  return new Promise((resolve, rejec) => {
    userModel
      .findOneAndDelete({_id: idUser, "accounts._id": idAccount})
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        rejec(e);
      });
  });
}
/*
function deleteAccount(idAccount, idUser) {
  return new Promise((resolve, rejec) => {
    let filterUser = {
      _id: idUser
    };
    userModel
      .update(filterUser, { $pullAll: { accounts: [idAccount] } })
      .then(data => {
        Model.findOneAndDelete({ _id: idAccount })
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
}*/
module.exports = {
  listAccounts,
  addAccount,
  //getAccount,
 updateAccount,
  deleteAccount
};
