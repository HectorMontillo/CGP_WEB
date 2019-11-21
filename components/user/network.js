const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const joiValidation = require("../../network/middleware");
const joiSchema = require("./validation");
const controller = require("./controller");
const mailsender = require("../../network/mailsender");

router.options("*", (req, res) => {
  response.success(req, res, "Bebecita", 200);
});

router.get("/", (req, res) => {
  controller
    .listUsers(req.query)
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

router.get("/:idUser", (req, res) => {
  controller
    .getUser(req.params.idUser)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error buscando un usuario por _id"
      );
    });
});

router.post("/", joiValidation(joiSchema, "body"), (req, res) => {
  controller
    .addUser(req.body)
    .then(data => {
      mailsender.sendMail(
        data.email,
        "Bienvenido",
        "Bienvenido a CGP-WEB",
        `<h1 style="color:blue;">Bienvenido a CGP-WEB<h1>`
      );
      response.success(req, res, data, 201);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error en el creando un nuevo usuario "
      );
    });
});

router.put("/:idUser", joiValidation(joiSchema, "body"), (req, res) => {
  controller
    .updateUser(req.params.idUser, req.body)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error modificando un usuario"
      );
    });
});

router.delete("/:idUser", (req, res) => {
  controller
    .deleteUser(req.params.idUser)
    .then(data => {
      mailsender.sendMail(
        data.email,
        "Hasta luego!!",
        "Hasta luego!!",
        `<h1 style="color:blue;">Hasta luego!!<h1>`
      );
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error eliminando un usuario"
      );
    });
});

module.exports = router;
