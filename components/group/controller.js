const store = require("./store");

function listGroups(query, idUser) {
  return store.listGroups(query, idUser);
}

function getGroup(idGroup) {
  return store.getGroup(idGroup);
}

function addGroup(group, idUser) {
  if (!group) {
    return Promise.reject("Invalid group");
  }
  return store.addGroup(group, idUser);
}

function updateGroup(idGroup, updateData) {
  if (!idGroup) {
    return Promise.reject("Invalid Group");
  }
  return store.updateGroup(idGroup, updateData);
}

function deleteGroup(idGroup, idUser) {
  if (!idGroup | !idUser) {
    return Promise.reject("Invalid Group");
  }
  return store.deleteGroup(idGroup, idUser);
}
module.exports = {
  updateGroup,
  listGroups,
  addGroup,
  getGroup,
  updateGroup,
  deleteGroup
};
