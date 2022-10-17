const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String,
  post_id: String,
});

const Bookmarks = mongoose.model("Bookmarks", schema);

module.exports = { Bookmarks };
