const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String,
  requests: Number,
  sent: Number,
  received: Number,
  answered: Number,
  deleted: Number,
});

const Ranking = mongoose.model("Ranking", schema);

module.exports = { Ranking };
