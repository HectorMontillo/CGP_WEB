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
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Document</title>
        
            <style>
              .container {
                width: 90%;
                margin: 0 auto;
                background-color: #f7f7f7;
                flex-direction: column;
                color: #6a6666;
                font-family: sans-serif;
                text-align: center;
              }
              .container img {
                width: 80px;
              }
              .container h2 {
                color: #6a6666;
                font-family: sans-serif;
              }
              .container a {
                margin: 10px 0;
              }
              .end {
                align-self: baseline;
                margin-bottom: 0;
              }
        
              .end span {
                color: #4d70fd;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img
                src="https://media.discordapp.net/attachments/641495045731778562/647174012463480862/Grupo_1302x.png"
                alt=""
              />
              <h2>Bienvenido a CGP-WEB ${data.fullname}</h2>
              <p>
                Gracias por confiar en CGP-WEB para llevar el control de tus gastos
                personales
              </p>
              <p>
                Para ingresar a nuestra plataforma puedes hacerlo a traves del sigueinte
                link:
              </p>
              <a href="https://cgp-web.now.sh/"
                >Empezar ya!!
              >
              <br />
              <i>Cuida de los pequeños gastos, un pequeño agujero hunde un barco</i>
        
              <p class="end">Feliz manejo de tus gastos</p>
              <p class="end">Team <span>CGP-WEB</span></p>
            </div>
          </body>
        </html>`
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
