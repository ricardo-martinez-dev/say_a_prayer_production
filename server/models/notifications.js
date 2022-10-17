const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String, // ! required
  hasNotification: { type: Boolean, default: false },
  isRang: { type: Boolean, default: false },
});

const Notifications = mongoose.model("Notifications", schema);

module.exports = { Notifications };
