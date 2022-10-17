const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String,
  count: Number,
});

const LoveSent = mongoose.model("LoveSent", schema);

module.exports = { LoveSent };
