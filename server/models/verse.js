const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  reference: String,
  verse: String,
  source: String,
});

const Verse = mongoose.model("Verse", schema);

module.exports = { Verse };
