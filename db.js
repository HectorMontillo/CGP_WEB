const db = require("mongoose");

//mongodb+srv://user:user1234@cluster0-lsrfs.mongodb.net/test?retryWrites=true&w=majority

db.Promise = global.Promise; //TODO Investigar que hace esta vaina

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log("[db] conectada con éxito");
}

module.exports = connect;
