const userPic = require("../../models/picture");
const utils = require("../utils");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getFriendsIds = (obj) => {
  const { friends, userId } = obj;

  try {
    return friends.map((f, i) => {
      if (f.to_user === userId) return f.from_user;
      else return f.to_user;
    });
  } catch (error) {
    utils.logError(error);
  }
};

const fetchPictures = async (uniqIds) => {
  try {
    return await userPic.Picture.find(
      { user_id: { $in: uniqIds } },
      "_id user_id name"
    ).limit(4);
  } catch (error) {
    utils.logError(error);
  }
};

const merge = (obj) => {
  const { pics, users } = obj;

  let temp = [];

  for (let i in pics) {
    for (let j in users) {
      const pic = pics[i]["user_id"].toString();
      const user = users[j]["_id"].toString();

      if (pic !== user) continue;

      const newObj = {
        _id: pics[i]["_id"],
        name: pics[i]["name"],
        user_id: pics[i]["user_id"],
        fname: users[j]["fname"],
        lname: users[j]["lname"],
        religion: users[j]["religion"],
      };

      temp.push(newObj);
    }
  }

  return temp;
};

module.exports = { merge, fetchPictures, getFriendsIds, shuffle };
