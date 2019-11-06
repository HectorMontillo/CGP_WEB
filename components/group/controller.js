const store = require("./store");

function listGroups(query, idUser) {
  return store.listGroups(query, idUser);
}

function addGroup(group, idUser) {
  if (!group) {
    return Promise.reject("Invalid group");
  }
  return store.addGroup(group, idUser);
}
module.exports = {
  listGroups,
  addGroup
};
