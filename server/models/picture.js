const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String, // ! required
  name: { type: String, default: "avatar.jpg" },
  img: {
    data: Buffer,
    contentType: String,
  },
  imgId: String,
});

const Picture = mongoose.model("Picture", schema);

module.exports = { Picture };
