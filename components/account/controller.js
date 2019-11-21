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
module.exports = {
  listAccounts,
  addAccount,
  getAccount
};
