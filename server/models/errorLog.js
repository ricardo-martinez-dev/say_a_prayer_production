const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  date: { type: String, default: new Date() },
  log: String,
  error: String,
});

const ErrorLog = mongoose.model("ErrorLog", schema);

module.exports = { ErrorLog };
