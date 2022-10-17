const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  themeName: String,
  black: String,

  // body
  "body-bg": String,
  "body-color": String,

  // element
  "elem-color": String,
  "elem-bg": String,

  // icons
  "icon-info": String,
  "icon-prayer": String,
  "icon-answer": String,
  "icon-report": String,
  "icon-trash": String,
  "icon-recover": String,
  "icon-view": String,
  "sponsor-icon": String,

  // nav
  "nav-headers": String,
  "nav-hover": String,
  "nav-sponsor-icon": String,

  // basic button
  "button-basic-color": String,
  "button-basic-bg": String,

  // profile
  "profile-user-name": String,
  "profile-sponsor": String,
  "profile-close-btn": String,
  "profile-member-statistics": String,

  // scrollbar
  "scrollbar-track-bg": String,
  "scrollbar-thumb-bg": String,

  // prayer
  "prayer-title": String,
  "prayer-loader": String,
});

const Theme = mongoose.model("Theme", schema);

module.exports = { Theme };
