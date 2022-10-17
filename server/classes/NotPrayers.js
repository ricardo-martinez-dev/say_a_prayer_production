const utils = require("../utils/utils");
const prayer = require("../models/prayers");
const pic = require("../models/picture");
const requests = require("../models/request");

module.exports = class NotPrayers {
  constructor(obj) {
    this.user_id = obj.user_id;
  }

  #fetchAvatars = async (arr) => {
    try {
      return await pic.Picture.find(
        {
          user_id: { $in: arr },
        },
        "name user_id -_id"
      );
    } catch (error) {
      utils.logError(error);
      throw error;
    }
  };

  #fetchPrayers = async () => {
    try {
      return await prayer.Prayers.find({
        to_user: this.user_id,
        abuse: { $nin: [this.user_id] },
      })
        .limit(50)
        .sort({ _id: "-1" });
    } catch (error) {
      utils.logError(error);
      throw error;
    }
  };

  #filterUserIds = async (arr) => {
    const userIds = arr.map((p) => p.from_user);
    return [...new Set(userIds)];
  };

  #filterRequestIds = async (arr) => {
    const reqIds = arr.map((p) => p.request_id);
    return [...new Set(reqIds)];
  };

  #mergePicsAndPrayers = async (obj) => {
    const { listOfPrayers, pics } = obj;
    let res = [];

    for (let i in listOfPrayers) {
      for (let j in pics) {
        const prayer = listOfPrayers[i]["from_user"].toString();
        const pic = pics[j]["user_id"].toString();

        if (prayer !== pic) continue;

        let temp = {
          _id: listOfPrayers[i]["_id"],
          request_id: listOfPrayers[i]["request_id"],
          from_user: listOfPrayers[i]["from_user"],
          to_user: listOfPrayers[i]["to_user"],
          prayer: listOfPrayers[i]["prayer"],
          date: listOfPrayers[i]["date"],
          isLiked: listOfPrayers[i]["isLiked"],

          pic: pics[j]["name"],
        };

        res.push(temp);
      }
    }

    return res;
  };

  #fetchRequetTitles = async (filterRequestIds) => {
    const res = await requests.Request.find(
      { _id: { $in: filterRequestIds } },
      "_id user_id title"
    );

    return res;
  };

  #mergePrayersAndTitle = (obj) => {
    const { mergedPrayers, requestTitles } = obj;
    const res = [];

    for (let i in mergedPrayers) {
      for (let j in requestTitles) {
        const title = requestTitles[j]["_id"].toString();
        const prayer = mergedPrayers[i]["request_id"].toString();

        if (title !== prayer) continue;

        const temp = {
          ...mergedPrayers[i],
          title: requestTitles[j]["title"],
        };

        res.push(temp);
      }
    }

    return res;
  };

  fetchPrayersNotifications = async () => {
    try {
      const listOfPrayers = await this.#fetchPrayers(this.user_id);
      const filteredUserIds = await this.#filterUserIds(listOfPrayers);
      const pics = await this.#fetchAvatars(filteredUserIds);
      const filterRequestIds = await this.#filterRequestIds(listOfPrayers);
      const requestTitles = await this.#fetchRequetTitles(filterRequestIds);
      const mergedPrayers = await this.#mergePicsAndPrayers({
        listOfPrayers,
        pics,
      });

      const res = this.#mergePrayersAndTitle({ mergedPrayers, requestTitles });

      return res;
    } catch (error) {
      utils.logError(error);
      throw error;
    }
  };
};
