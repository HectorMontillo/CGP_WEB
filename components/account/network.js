const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

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
        "Ocurrio un error obteniendo informacion de usuario"
      );
    });
});

router.post("/:idUser", (req, res) => {
  controller
    .addAccount(req.body, req.params.idUser)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error en el creando un nuevo usuario"
      );
    });
});
module.exports = router;
