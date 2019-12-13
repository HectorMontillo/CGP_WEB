const Model = require("./model");
const accountModel = require("../account/model");

function listTransactions(query, idAccount) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idAccount) {
      filter = {
        _id: idAccount
      };
    }
    accountModel
      .find(filter)
      .populate("transactions")
      .exec((err, data) => {
        if (err) {
          rejec(err);
        } else {
          resolve(data[0].transactions);
        }
      });
  });
}

function getTransaction(idTransaction) {
  return new Promise((resolve, rejec) => {
    let filter = {
      _id: idTransaction ? idTransaction : ""
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

function addTransaction(Transaction, idAccount) {
  return new Promise((resolve, rejec) => {
    const myTransaction = new Model(Transaction);
    myTransaction
      .save()
      .then(data => {
        updateTransactionsAccount(idAccount, data._id, Transaction.value)
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

function updateTransactionsAccount(idAccount, newIdTransaction, value) {
  return new Promise((resolve, rejec) => {
    let filter = {};
    if (idAccount) {
      filter = {
        _id: idAccount
      };
    }
    accountModel
      .findOneAndUpdate(filter, { $push: { transactions: newIdTransaction } })
      .then(data => {
        accountModel.findOne(filter, function(err, data) {
          if (data) {
            data.savingAccount.balance += value;
            data.save();
          }
        });
        resolve(data);
      })
      .catch(e => {
        rejec(e);
      });
  });
}
module.exports = {
  listTransactions,
  addTransaction,
  getTransaction
};
