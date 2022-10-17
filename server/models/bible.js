const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  lang: String,
  version: String,
  code: String,
});

const Bible = mongoose.model("Bible", schema);

module.exports = { Bible };
