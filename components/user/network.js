const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const joiValidation = require("../../network/middleware");
const joiSchema = require("./validation");
const controller = require("./controller");

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

router.post("/", joiValidation(joiSchema), (req, res) => {
  controller
    .addUser(req.body)
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(e => {
      response.error(
        req,
        res,
        e,
        500,
        "Ocurrio un error en el creando un nuevo usuario " +
          (e.errmsg || e.message)
      );
    });
});

router.put("/:idUser", (req, res) => {
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

/*
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

*/

module.exports = router;
