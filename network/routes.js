const express = require("express");
const user = require("../components/user/network");
const account = require("../components/account/network");
const group = require("../components/group/network");

const routes = server => {
  server.use("/user", user);
  server.use("/account", account);
  server.use("/group", group);
};

module.exports = routes;
