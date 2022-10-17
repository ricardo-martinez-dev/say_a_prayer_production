const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tag: String,
  from_user: String,
  to_user: String,
  target: String,
  target_id: String,
  date: { type: String, default: new Date() },
});

const Love = mongoose.model("Love", schema);

module.exports = { Love };
