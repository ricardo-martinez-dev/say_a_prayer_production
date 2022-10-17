const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String,
  count: Number,
});

const LoveReceived = mongoose.model("LoveReceived", schema);

module.exports = { LoveReceived };
