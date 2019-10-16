const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

router.get("/", (req, res) => {
  controller
    .listUsers()
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, e, 500, "Ocurrio un error en el controlador");
    });
});

router.post("/", (req, res) => {
  controller
    .addUser(req.body)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, e, 500, "Ocurrio un error en el controlador");
    });
});

module.exports = router;