const repModel = require("../../models/request");
const pst = require("../../models/post");
const prayer = require("../../models/prayers");
const utils = require("../../utils/utils");

const getLastReceivedPrayers = async (userId) => {
  try {
    let listOfPrayers = await prayer.Prayers.find({
      to_user: userId,
    }).sort({
      _id: -1,
    });

    const prayersIds = listOfPrayers.map((obj) => obj.request_id);
    const listOfRequets = await repModel.Request.find(
      {
        _id: { $in: prayersIds },
      },
      "tags title description pic user_id isPost"
    );

    const res = [];

    for (const i in listOfPrayers) {
      for (const j in listOfRequets) {
        // request_id in prayer
        const one = listOfPrayers[i]["request_id"].toString();
        // request's _id
        const two = listOfRequets[j]["_id"].toString();

        if (one === two) {
          const temp = {
            date: listOfPrayers[i]["date"],
            from_user: listOfPrayers[i]["from_user"],
            to_user: listOfPrayers[i]["to_user"],
            request_id: listOfPrayers[i]["request_id"],
            _id: listOfPrayers[i]["_id"],
            prayer: listOfPrayers[i]["prayer"],
            tags: listOfRequets[j]["tags"],
            title: listOfRequets[j]["title"],
            description: listOfPrayers[i]["prayer"],
            user_id: listOfRequets[j]["user_id"],
            isPost: listOfRequets[j]["isPost"],
          };

          res.push(temp);
        }
      }
    }

    return res;
  } catch (error) {
    utils.logError(error);
  }
};

const getLastSentPrayers = async (userId) => {
  return await prayer.Prayers.find({
    from_user: userId,
  }).sort({
    _id: -1,
  });
};

const getLastPosts = async (userId) => {
  return await pst.Post.find({
    user_id: userId,
    status: "published",
  }).sort({
    _id: -1,
  });
};

const getLastAnsweredRequests = async (userId) => {
  return await repModel.Request.find(
    {
      user_id: { $eq: userId },
      status: "answered",
    },
    "tags title description pic user_id isPost"
  ).sort({
    _id: -1,
  });
};

const getLastSentRequests = async (userId) => {
  return await repModel.Request.find(
    {
      user_id: { $eq: userId },
      status: "requested",
    },
    "tags title description pic user_id isPost"
  ).sort({
    _id: -1,
  });
};

module.exports = {
  getLastReceivedPrayers,
  getLastSentPrayers,
  getLastPosts,
  getLastAnsweredRequests,
  getLastSentRequests,
};
