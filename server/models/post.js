const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  status: { type: String, default: "published" },
  date: { type: Date, default: Date.now },
  user_id: String,
  pic: String,
  loveCount: { type: Number, default: 0 },
  abuse: [String],
  isPost: { type: Boolean, default: true },
  createdAt: { type: String, default: new Date().getTime() },
});

const Post = mongoose.model("Post", schema);

module.exports = { Post };
