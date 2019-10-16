const store = require("./store");

function listUsers() {
  return store.listUsers();
}

function addUser(user) {
  //TODO Se debe validar la información que viene desde el body del req
  if (!user) {
    return Promise.reject("Invalid User");
  }
  return store.addUser(user);
}

module.exports = {
  listUsers,
  addUser
};

