const mongoose = require("mongoose");

const db = "mongodb+srv://root:root@cluster0.93mkf.mongodb.net/test";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongoose connected ...");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose
