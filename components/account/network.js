const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

const joiValidation = require("../../network/middleware");
const joiSchema = require("./validation");

router.options("*", (req, res) => {
  response.success(req, res, "Bebecita", 200);
});

router.get("/:idUser", (req, res) => {
  controller
    .listAccounts(req.query, req.params.idUser)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error obteniendo informacion de cuentas de usuario "
      );
    });
});

router.get("/search/:idAccount", (req, res) => {
  controller
    .getAccount(req.params.idAccount)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error obteniendo informacion de Cuenta"
      );
    });
});

router.post("/:idUser", joiValidation(joiSchema, "body"), (req, res) => {
  controller
    .addAccount(req.body, req.params.idUser, req.body.groupId)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error en el creando una nueva cuenta"
      );
    });
});
module.exports = router;
