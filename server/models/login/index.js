const mongoose = require("../../db");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true}
});

module.exports = mongoose.model("User", userSchema);