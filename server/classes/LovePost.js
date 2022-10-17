const pst = require("../models/post");
const lov = require("../models/love");
const loveSent = require("../models/loveSent");
const loveReceived = require("../models/loveReceived");
const utils = require("../utils/utils");

// TODO : DRY !!! Same class as in utils/prayers.js

module.exports = class LovePost {
  constructor(obj) {
    this.targetId = obj.targetId;
    this.isLiked = obj.isLiked;
    this.to_user = obj.to_user;
    this.from_user = obj.from_user;
    this.target = obj.target;
  }

  sendLove = async (obj) => {
    await loveSent.LoveSent.findOneAndUpdate(
      { user_id: obj.user_id },
      obj.update,
      obj.options
    );
  };

  receiveLove = async (obj) => {
    await loveReceived.LoveReceived.findOneAndUpdate(
      { user_id: obj.user_id },
      obj.update,
      obj.options
    );
  };

  lovePrayer = async (obj) => {
    const { targetId, isLiked } = obj;
    await pst.Post.findByIdAndUpdate(
      { _id: targetId },
      { $inc: { loveCount: isLiked ? 1 : -1 } }
    );
  };

  love = async (obj) => {
    const { isLiked, from_user, to_user, prayerId, options, target } = obj;

    if (isLiked) {
      await lov.Love.findOneAndUpdate(
        { to_user, from_user, target_id: prayerId },
        { to_user, from_user, target_id: prayerId, target },
        options
      );
    } else {
      await lov.Love.findOneAndDelete({
        to_user,
        from_user,
        target_id: prayerId,
        target,
      });
    }
  };

  handleLove = async () => {
    try {
      const update = { $inc: { count: this.isLiked ? 1 : -1 } };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      await this.love({
        to_user: this.to_user,
        from_user: this.from_user,
        prayerId: this.targetId,
        isLiked: this.isLiked,
        options: options,
        target: this.target,
      });
      await this.lovePrayer({
        targetId: this.targetId,
        isLiked: this.isLiked,
      });
      await this.sendLove({
        user_id: this.to_user,
        update,
        options,
        target: this.target,
      });
      await this.receiveLove({
        user_id: this.from_user,
        update,
        options,
        target: this.target,
      });

      return { status: "success" };
    } catch (error) {
      utils.logError(error);

      return { status: "fail" };
    }
  };
};
