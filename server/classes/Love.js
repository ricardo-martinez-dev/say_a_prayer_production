const pst = require("../models/post");
const prayers = require("../models/prayers");
const lov = require("../models/love");
const loveSent = require("../models/loveSent");
const loveReceived = require("../models/loveReceived");
const utils = require("../utils/utils");

module.exports = class LovePost {
  constructor(obj) {
    this.targetId = obj.targetId;
    this.isLiked = obj.isLiked;
    this.to_user = obj.to_user;
    this.from_user = obj.from_user;
    this.target = obj.target;
  }

  handleLove = async () => {
    try {
      const update = { $inc: { count: this.isLiked ? 1 : -1 } };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const elem = {
        to_user: this.to_user,
        from_user: this.from_user,
        prayerId: this.targetId,
        isLiked: this.isLiked,
        options: options,
        target: this.target,
      };

      await this.#updateLoveCount(elem);

      const obj = {
        [this.target === "post" ? "targetId" : "prayerId"]: this.targetId,
        isLiked: this.isLiked,
      };

      await this.#lovePrayer(obj);
      await this.#sendLove({
        user_id: elem.to_user,
        update,
        options,
        target: elem.target,
      });
      await this.#receiveLove({
        user_id: elem.from_user,
        update,
        options,
        target: elem.target,
      });

      return { status: "success" };
    } catch (error) {
      utils.logError(error);
      return { status: "fail" };
    }
  };

  #sendLove = async (obj) => {
    await loveSent.LoveSent.findOneAndUpdate(
      { user_id: obj.user_id },
      obj.update,
      obj.options
    );
  };

  #receiveLove = async (obj) => {
    await loveReceived.LoveReceived.findOneAndUpdate(
      { user_id: obj.user_id },
      obj.update,
      obj.options
    );
  };

  #lovePrayer = async (obj) => {
    const { targetId, isLiked } = obj;

    if (this.target === "post") {
      // post
      await pst.Post.findByIdAndUpdate(
        { _id: targetId },
        { $inc: { loveCount: isLiked ? 1 : -1 } }
      );
    } else {
      // prayer
      const { prayerId, isLiked } = obj;
      await prayers.Prayers.findByIdAndUpdate({ _id: prayerId }, { isLiked });
    }
  };

  #updateLoveCount = async (obj) => {
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
};
