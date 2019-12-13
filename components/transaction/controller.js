const store = require("./store");

function listTransactions(query, idAccount) {
  return store.listTransactions(query, idAccount);
}

function getTransaction(idTransaction) {
  return store.getGroup(idTransaction);
}

function addTransaction(Transaction, idAccount) {
  if (!Transaction) {
    return Promise.reject("Invalid Transaction");
  }
  return store.addTransaction(Transaction, idAccount);
}

module.exports = {
  listTransactions,
  addTransaction,
  getTransaction
};
