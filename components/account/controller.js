const store = require("./store");

function listAccounts(query, idUser) {
  return store.listAccounts(query, idUser);
}

function addAccount(account, idUser) {
  if (!account) {
    return Promise.reject("Invalid Account");
  }
  return store.addAccount(account, idUser);
}
module.exports = {
  listAccounts,
  addAccount
};
