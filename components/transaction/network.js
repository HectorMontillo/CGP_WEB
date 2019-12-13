const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

const joiValidation = require("../../network/middleware");
const joiSchema = require("./validation");

router.options("*", (req, res) => {
  response.success(req, res, "Bebecita", 200);
});

router.get("/:idAccount", (req, res) => {
  controller
    .listTransactions(req.query, req.params.idAccount)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error obteniendo las transacciones de cuentas"
      );
    });
});

router.get("/search/:idTransaction", (req, res) => {
  controller
    .getTransaction(req.params.idTransaction)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error obteniendo información de Transacción"
      );
    });
});

router.post("/:idAccount", (req, res) => {
  controller
    .addTransaction(req.body, req.params.idAccount)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error en el creando una nueva transacción"
      );
    });
});
module.exports = router;
