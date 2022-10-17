const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String,
  avatar: String,
});

const Avatar = mongoose.model("Avatar", schema);

module.exports = { Avatar };
