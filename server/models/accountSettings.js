const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: String, // ! required
  chosenTheme: { type: String, default: "black" },
  privacy: {
    showCity: { type: Boolean, default: true },
    showCountry: { type: Boolean, default: true },
    showReligion: { type: Boolean, default: true },
    showDenomination: { type: Boolean, default: true },
    showSponsorship: { type: Boolean, default: true },
    showAge: { type: Boolean, default: true },
  },
});

const AccountSettings = mongoose.model("AccountSettings", schema);

module.exports = { AccountSettings };
