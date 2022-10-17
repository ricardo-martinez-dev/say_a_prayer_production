const frnd = require("../models/friendshipRequest");
const user = require("../models/user");
const utils = require("../utils/utils");
const validation = require("../utils/validation");
const frnds = require("../utils/routes/friends");
const picModel = require("../models/picture");

const express = require("express");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const memberId = validation.validateId(req.query.memberId);

    const friends = await frnd.FriendshipRequest.find({
      $or: [{ to_user: memberId }, { from_user: memberId }],
      $and: [{ status: "accepted" }],
    });

    const friendsIds = frnds.getFriendsIds({ friends, userId: memberId });
    const uniqIds = [...new Set(friendsIds)];
    const pics = await picModel.Picture.find(
      { user_id: { $in: uniqIds } },
      "_id user_id name"
    );

    const users = await user.User.find(
      { _id: { $in: uniqIds } },
      "_id religion fname lname"
    );

    const result = frnds.merge({ pics, users });
    const shuffled = frnds.shuffle(result);

    console.log(shuffled.length);

    res.status(200).send(shuffled);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/random/:userId", async (req, res) => {
  try {
    const userId = validation.validateId(req.params.userId);

    const friends = await frnd.FriendshipRequest.find({
      $or: [{ to_user: userId }, { from_user: userId }],
      $and: [{ status: "accepted" }],
    }).limit(4);

    const friendsIds = frnds.getFriendsIds({ friends, userId: userId });
    const uniqIds = [...new Set(friendsIds)];
    const pics = await frnds.fetchPictures(uniqIds);
    const shuffled = frnds.shuffle(pics);

    res.status(200).send(shuffled);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
