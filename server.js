const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./network/routes");

const db = require("./db");

db(
  "mongodb+srv://user:user1234@cluster0-lsrfs.mongodb.net/cgpweb?retryWrites=true&w=majority"
);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS"
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/app", express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

routes(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`El servidor esta escuchando en el puerto ${port}`);
});
