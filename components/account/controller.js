const store = require("./store");

function listAccounts(query, idUser) {
  return store.listAccounts(query, idUser);
}

function getAccount(idAccount) {
  return store.getAccount(idAccount);
}

function addAccount(account, idUser, idGroup) {
  if (!account) {
    return Promise.reject("Invalid Account");
  }
  return store.addAccount(account, idUser, idGroup);
}

function updateAccount(idAccount, updateData) {
  if (!idAccount) {
    return Promise.reject("Invalid Account");
  }
  return store.updateAccount(idAccount, updateData);
}

function deleteAccount(idAccount, idUser) {
  if (!idAccount | !idUser) {
    return Promise.reject("Invalid Account");
  }
  return store.deleteAccount(idAccount, idUser);
}
module.exports = {
  listAccounts,
  addAccount,
  getAccount,
  updateAccount,
  deleteAccount
};
