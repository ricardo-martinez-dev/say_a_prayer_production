const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  prayer: String,
  request_id: String,
  from_user: String,
  to_user: String,
  date: { type: Date, default: Date.now },
  createdAt: String,
  isLiked: { type: Boolean, default: false },
  abuse: [String],
});

const Prayers = mongoose.model("Prayers", schema);

module.exports = { Prayers };
