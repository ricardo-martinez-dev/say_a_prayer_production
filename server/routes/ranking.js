const utils = require("../utils/utils");
const validation = require("../utils/validation");
const rankUtils = require("../utils/routes/ranking");
const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const picModel = require("../models/picture");
const rankModel = require("../models/ranking");
const userModel = require("../models/user");
const loveReceivedModel = require("../models/loveReceived");
const loveSentModel = require("../models/loveSent");

getMemberInfo = async (elem) => {
  try {
    let ids = elem.map((el) => el.user_id).flat();
    ids = [...new Set(ids)];

    let res = await userModel.User.find({ _id: { $in: ids } }).select(
      "_id pic fname lname"
    );

    const records = await picModel.Picture.find(
      { user_id: { $in: ids } },
      "name user_id -_id"
    );

    let obj = [];

    res.forEach((el) => obj.push({ _id: el._id }));

    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < obj.length; j++) {
        if (res[i]._id === obj[j]._id) {
          obj[j].fname = res[i].fname;
          obj[j].lname = res[i].lname;
        }
      }
    }

    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < records.length; j++) {
        if (obj[i]._id == records[j].user_id) {
          const HOST =
            process.env.ENVIRONMENT === "dev"
              ? process.env.LOCAL_HOST
              : process.env.LIVE_HOST;

          const pic =
            records[j].name === "./gallery/avatars/avatar.jpg"
              ? "./gallery/avatars/avatar.jpg"
              : `${HOST}/api/avatar/${records[j].name}`;

          obj[i].pic = pic;
        }
      }
    }

    return obj;
  } catch (error) {
    utils.logError(error);
  }
};

mergeElements = ({ members, info, target }) => {
  return members.map((m) => {
    for (let i in info) {
      if (m.user_id == info[i]["_id"]) {
        let temp = {
          user_id: m.user_id,
          [target]: m[target],
          fname: info[i]["fname"],
          lname: info[i]["lname"],
          pic: info[i]["pic"],
        };

        return temp;
      }
    }
  });
};

// top posts
router.get("/posts", async (req, res) => {
  const mergePostAndPicture = (obj) => {
    const { arrayOfPosts, pics } = obj;
    let result = [];

    for (let i in arrayOfPosts) {
      for (let j in pics) {
        if (arrayOfPosts[i]["user_id"] !== pics[j]["user_id"]) continue;

        let temp = {
          _id: arrayOfPosts[i]._id,
          user_id: arrayOfPosts[i].user_id,
          title: arrayOfPosts[i].title,
          loveCount: arrayOfPosts[i].loveCount,
          date: arrayOfPosts[i].date,
          pic: pics[j].name,
        };

        result.push(temp);
      }
    }

    return result;
  };

  const sortByDate = (obj) => {
    return obj.sort((a, b) =>
      a.date < b.date && a.loveCount > b.loveCount
        ? -1
        : a.date > b.date && a.loveCount < b.loveCount
        ? 1
        : 0
    );
  };

  // todo : exclude abusive posts
  const arrayOfPosts = await postModel.Post.find(
    { status: "published" },
    "_id title user_id loveCount date"
  )
    .sort({ loveCount: -1, date: -1 })
    .limit(4);

  const userIds = arrayOfPosts.map((el) => el.user_id);
  const uniqUserIds = Array.from(new Set(userIds));

  const pics = await picModel.Picture.find(
    { user_id: uniqUserIds },
    "user_id name -_id"
  );

  let result = mergePostAndPicture({ arrayOfPosts, pics });
  result = sortByDate(result);

  res.json(result);
});

router.get("/members/requesting", async (req, res) => {
  let members = await rankModel.Ranking.find()
    .sort({ requests: -1 })
    .select(`user_id requests`)
    .limit(4);

  const info = await getMemberInfo(members);
  const result = mergeElements({ members, info, target: "requests" });

  res.json(result);
});

router.get("/members/praying", async (req, res) => {
  let members = await rankModel.Ranking.find()
    .sort({ sent: -1 })
    .select(`user_id sent`)
    .limit(4);

  const info = await getMemberInfo(members);
  const result = mergeElements({ members, info, target: "sent" });

  res.json(result);
});

router.get("/members/answered", async (req, res) => {
  let members = await rankModel.Ranking.find()
    .sort({ answered: -1 })
    .select(`user_id answered`)
    .limit(4);

  const info = await getMemberInfo(members);
  const result = mergeElements({ members, info, target: "answered" });

  res.json(result);
});

router.get("/members/receiving", async (req, res) => {
  let members = await rankModel.Ranking.find()
    .sort({ received: -1 })
    .select(`user_id received`)
    .limit(4);

  const info = await getMemberInfo(members);
  const result = mergeElements({ members, info, target: "received" });

  res.json(result);
});

router.get("/members/loved", async (req, res) => {
  let members = await loveReceivedModel.LoveReceived.find()
    .sort({ count: -1 })
    .limit(4);

  const info = await getMemberInfo(members);
  const result = mergeElements({ members, info, target: "count" });

  res.json(result);
});

router.get("/members/loving", async (req, res) => {
  let members = await loveSentModel.LoveSent.find()
    .sort({ count: -1 })
    .limit(4);

  const info = await getMemberInfo(members);
  const result = mergeElements({ members, info, target: "count" });

  res.json(result);
});

// --------

router.post("/request", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    await rankUtils.updateRanking({
      user: user_id,
      value: { requests: 1 },
    });

    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error });
  }
});

router.post("/restore", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const src = validation.validateBoolean(req.body.src);

    await rankUtils.updatePostRestore({ user_id, src });
    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error });
  }
});

router.post("/deleted", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);

    await rankUtils.updateRanking({ user: user_id, value: { requests: -1 } });
    await rankUtils.updateRanking({
      user: user_id,
      value: { deleted: 1 },
    });

    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error });
  }
});

router.post("/sent", async (req, res) => {
  try {
    const from_user = validation.validateId(req.body.from_user);
    const to_user = validation.validateId(req.body.to_user);

    await rankUtils.updateRanking({ user: from_user, value: { sent: 1 } });
    await rankUtils.updateRanking({ user: to_user, value: { received: 1 } });

    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error });
  }
});

router.post("/answered", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);

    await rankUtils.updateRanking({ user: user_id, value: { answered: 1 } });
    await rankUtils.updateRanking({
      user: user_id,
      value: { requests: -1 },
    });
    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
