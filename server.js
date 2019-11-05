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
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/app", express.static("public"));

app.options("*", cors());
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Custom-Header"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
});
*/
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

routes(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`El servidor esta escuchando en el puerto ${port}`);
});
