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
    .listGroups(req.query, req.params.idUser)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error obteniendo informacion de los grupos"
      );
    });
});

router.get("/search/:idGroup", (req, res) => {
  controller
    .getGroup(req.params.idGroup)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error obteniendo informacion de Grupo"
      );
    });
});

router.post("/:idUser", joiValidation(joiSchema, "body"), (req, res) => {
  controller
    .addGroup(req.body, req.params.idUser)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error en el creando un nuevo grupo"
      );
    });
});

router.put("/:idGroup", joiValidation(joiSchema, "body"), (req, res) => {
  controller
    .updateGroup(req.params.idGroup, req.body)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, e, 500, "Ocurrio un error modificando un grupo");
    });
});

router.delete("/:idGroup/:idUser", (req, res) => {
  controller
    .deleteGroup(req.params.idGroup, req.params.idUser)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, e, 500, "Ocurrio un error eliminando un grupo");
    });
});
module.exports = router;
