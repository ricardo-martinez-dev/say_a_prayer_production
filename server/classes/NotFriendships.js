const utils = require("../utils/utils");
const usr = require("../models/user");
const frnd = require("../models/friendshipRequest");
const pic = require("../models/picture");
const { AccountSettings } = require("../models/accountSettings");

module.exports = class NotFriendships {
  constructor(obj) {
    this.user_id = obj.user_id;
  }

  #fetchAvatars = async (arr) => {
    try {
      return await pic.Picture.find({
        user_id: { $in: arr },
      });
    } catch (error) {
      utils.logError(error);
      throw error;
    }
  };

  fetchFriendshipRequests = async () => {
    try {
      return await frnd.FriendshipRequest.find({
        to_user: this.user_id,
      });
    } catch (error) {
      utils.logError(error);
      throw error;
    }
  };

  #filterUserIds = async (arr) => {
    const userIds = arr.map((p) => p.from_user);
    return [...new Set(userIds)];
  };

  #createFriendRequestObj = async (obj) => {
    const { listOfFriendshipRequests, pics, users } = obj;
    let res = [];

    for (let i in listOfFriendshipRequests) {
      for (let j in pics) {
        for (let l in users) {
          if (listOfFriendshipRequests[i]["status"] === "accepted") continue;

          const userSettings = await AccountSettings.findOne({
            user_id: listOfFriendshipRequests[i]["from_user"],
          });

          const {
            showAge,
            showCity,
            showCountry,
            showDenomination,
            showReligion,
          } = userSettings.privacy;

          console.log(userSettings.privacy);

          if (
            listOfFriendshipRequests[i]["from_user"].toString() ===
              pics[j]["user_id"].toString() &&
            listOfFriendshipRequests[i]["from_user"].toString() ===
              users[l]["_id"].toString()
          ) {
            let temp = {
              _id: listOfFriendshipRequests[i]["_id"],
              from_user: listOfFriendshipRequests[i]["from_user"],
              to_user: listOfFriendshipRequests[i]["to_user"],
              status: listOfFriendshipRequests[i]["status"],
              date: listOfFriendshipRequests[i]["date"],
              createdAt: listOfFriendshipRequests[i]["createdAt"],
              pic: pics[j]["name"],
              fname: users[l]["fname"],
              lname: users[l]["lname"],
              religion: showReligion ? users[l]["religion"] : "*****",
              gender: "*****",
              denomination: showDenomination
                ? users[l]["denomination"]
                : "*****",
              country: showCountry ? users[l]["country"] : "*****",
              city: showCity ? users[l]["city"] : "*****",
            };

            res.push(temp);
          }
        }
      }
    }

    return res;
  };

  fetchPrayersNotifications = async () => {
    try {
      const listOfFriendshipRequests = await this.fetchFriendshipRequests(
        this.user_id
      );
      const filteredUserIds = await this.#filterUserIds(
        listOfFriendshipRequests
      );
      const pics = await this.#fetchAvatars(filteredUserIds);
      const users = await usr.User.find({ _id: { $in: filteredUserIds } });
      const obj = await this.#createFriendRequestObj({
        listOfFriendshipRequests,
        users,
        pics,
      });

      return obj;
    } catch (error) {
      utils.logError(error);
      throw error;
    }
  };
};
