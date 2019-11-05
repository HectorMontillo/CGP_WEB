const express = require("express");
const user = require("../components/user/network");
const account = require("../components/account/network");

const routes = server => {
  server.use("/user", user);
  server.use("/account", account);
};

module.exports = routes;
