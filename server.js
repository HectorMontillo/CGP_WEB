const express = require("express");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");

const routes = require("./network/routes");

const db = require("./db");

db(
  "mongodb+srv://user:user1234@cluster0-lsrfs.mongodb.net/test?retryWrites=true&w=majority"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/app", express.static("public"));
routes(app);

server.listen(3000, () => {
  console.log(`El servidor esta escuchando en el puerto 3000`);
});