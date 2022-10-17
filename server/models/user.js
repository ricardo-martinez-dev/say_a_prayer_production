const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  /* --- basic info --- */
  fname: { type: String, required: true }, // ! required
  lname: { type: String, required: true }, // ! required
  email: { type: String, required: true }, // ! required
  password: { type: String, required: true }, // ! required
  bday: { type: String, default: "*****" },
  pic: {
    type: String,
    default: "avatar.jpg",
  },
  gender: { type: String, default: "*****" },
  /* --- address --- */
  city: { type: String, default: "*****" },
  country: { type: String, default: "*****" },
  /* --- religion --- */
  religion: { type: String, default: "*****" },
  denomination: { type: String, default: "*****" },
  languages: [String],
  /* --- account --- */
  // accountCreationDate: { type: Date, default: Date.now },
  createdAt: String,
  date: { type: Date, default: Date.now },

  sponsorship: {
    isSponsor: { type: Boolean, default: false },
    // amount: String,
    // date: String,
    lastDonationDate: String,
    lastQuantityDonated: String,
    totalQuantityDonated: String,
  },

  privacy: {
    hideCity: { type: Boolean, default: false },
    hideCountry: { type: Boolean, default: false },
    hideReligion: { type: Boolean, default: false },
    hideDenomination: { type: Boolean, default: false },
    hideAge: { type: Boolean, default: false },
  },
  statistics: {
    requests: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    sent: { type: Number, default: 0 },
    received: { type: Number, default: 0 },
  },
  theme: { type: String, default: "dark" },
});

const User = mongoose.model("User", schema);

module.exports = { User };
