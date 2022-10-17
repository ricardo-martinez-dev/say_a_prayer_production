const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  status: { type: String, default: "requested" },
  date: { type: Date, default: Date.now },
  user_id: String,
  pic: String,
  abuse: [String],
  isPost: { type: Boolean, default: false },
  createdAt: { type: String, default: new Date().getTime() },
});

const Request = mongoose.model("Request", schema);

module.exports = { Request };
