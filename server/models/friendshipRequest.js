const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  status: String,
  date: Date,
  from_user: String,
  to_user: String,
  createdAt: String,
});

const FriendshipRequest = mongoose.model("FriendshipRequest", schema);

module.exports = { FriendshipRequest };
