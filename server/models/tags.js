const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tag: String,
  counter: Number,
});

const Tags = mongoose.model("Tags", schema);

module.exports = { Tags };
