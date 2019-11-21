const store = require("./store");

function listUsers(query) {
  return store.listUsers(query);
}

function addUser(user) {
  if (!user) {
    return Promise.reject("Invalid User");
  }
  if (user.fullname) {
    user.fullname = user.fullname.replace(" ", "-");
  }
  return store.addUser(user);
}

function getUser(idUser) {
  if (!idUser) {
    return Promise.reject("Invalid User");
  }
  return store.getUser(idUser);
}

function updateUser(idUser, updateData) {
  if (!idUser) {
    return Promise.reject("Invalid User");
  }
  return store.updateUser(idUser, updateData);
}

function deleteUser(idUser) {
  if (!idUser) {
    return Promise.reject("Invalid User");
  }
  return store.deleteUser(idUser);
}

module.exports = {
  listUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser
};
