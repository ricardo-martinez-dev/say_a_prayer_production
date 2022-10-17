const sponsorship = require("../models/user");
const validation = require("../utils/validation");
const utils = require("../utils/utils");

const express = require("express");
const router = express.Router();

const premiumNav = {
  filter: [
    "general",
    "read",
    "your posts",
    "your requests",
    "community requests",
    "settings",
    "support",
    "your space",
  ],
  sections: [
    {
      section: "general",
      options: [
        { icon: "fas fa-home", txt: "home" },
        { icon: "fa-solid fa-users", txt: "members" },
        { icon: "far fa-compass", txt: "explore" },
      ],
    },
    {
      section: "support",
      options: [{ icon: "fas fa-heart", txt: "donate" }],
    },
    {
      section: "your space",
      options: [
        { icon: "fas fa-user", txt: "profile" },
        { icon: "fas fa-bell", txt: "notifications" },
        { icon: "fas fa-bookmark", txt: "bookmarks" },
        { icon: "fa-solid fa-triangle-exclamation", txt: "reports" },
      ],
    },
    {
      section: "read",
      options: [{ icon: "fa-solid fa-book-bible", txt: "bible" }],
    },
    {
      section: "community requests",
      options: [
        { icon: "fas fa-pray", txt: "requests" },
        { icon: "fas fa-child", txt: "answered" },
      ],
    },
    {
      section: "your requests",
      options: [
        { icon: "fas fa-praying-hands", txt: "new request" },
        { icon: "fas fa-pray", txt: "requests" },
        { icon: "fas fa-child", txt: "answered" },
        { icon: "fas fa-trash", txt: "deleted" },
      ],
    },
    {
      section: "your posts",
      options: [
        { icon: "fas fa-comment", txt: "new post" },
        { icon: "fas fa-comments", txt: "published" },
        { icon: "fas fa-comment-slash", txt: "deleted posts" },
      ],
    },
    {
      section: "settings",
      options: [
        { icon: "fas fa-palette", txt: "themes" },
        { icon: "fas fa-user-secret", txt: "privacy" },
      ],
    },
    {
      section: "other",
      options: [
        { icon: "fas fa-home", txt: "log out" },
        { icon: "fas fa-trash", txt: "delete account" }, // todo : delete this before deploying
      ],
    },
  ],
};

const commonNav = {
  filter: [
    "general",
    "read",
    "your posts",
    "your requests",
    "community requests",
    "settings",
    "support",
    "your space",
  ],
  sections: [
    {
      section: "general",
      options: [
        { icon: "fas fa-home", txt: "home" },
        { icon: "far fa-compass", txt: "explore" },
        { icon: "fa-solid fa-users", txt: "members" },
      ],
    },
    {
      section: "support",
      options: [{ icon: "fas fa-heart", txt: "donate" }],
    },
    {
      section: "your space",
      options: [
        { icon: "fas fa-user", txt: "profile" },
        { icon: "fas fa-bell", txt: "notifications" },
        { icon: "fas fa-bookmark", txt: "bookmarks" },
        { icon: "fa-solid fa-triangle-exclamation", txt: "reports" },
      ],
    },
    {
      section: "read",
      options: [{ icon: "fa-solid fa-book-bible", txt: "bible" }],
    },
    {
      section: "community requests",
      options: [
        { icon: "fas fa-pray", txt: "requests" },
        { icon: "fas fa-child", txt: "answered" },
      ],
    },
    {
      section: "your requests",
      options: [
        { icon: "fas fa-praying-hands", txt: "new request" },
        { icon: "fas fa-pray", txt: "requests" },
        { icon: "fas fa-child", txt: "answered" },
        { icon: "fas fa-trash", txt: "deleted" },
      ],
    },
    {
      section: "your posts",
      options: [
        { icon: "fas fa-comment", txt: "new post" },
        { icon: "fas fa-comments", txt: "published" },
        { icon: "fas fa-comment-slash", txt: "deleted posts" },
      ],
    },
    {
      section: "settings",
      options: [
        { icon: "fas fa-palette", txt: "themes" },
        { icon: "fas fa-mask", txt: "privacy" },
      ],
    },
    {
      section: "other",
      options: [
        { icon: "fas fa-home", txt: "log out" },
        { icon: "fas fa-trash", txt: "delete account" }, // todo : delete this before deploying
      ],
    },
  ],
};

async function getMembershipType(user_id) {
  const res = await sponsorship.User.find({ _id: user_id }, "sponsorship");
  return res[0]["sponsorship"].isSponsor;
}

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const isPremium = await getMembershipType(user_id);
    const nav = isPremium ? premiumNav : commonNav;

    res.status(200).send(nav);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
