const notify = require("../../models/notifications");
const utils = require("../utils");
const validation = require("../validation");
const prayers = require("../../models/prayers");

module.exports = class NewPrayer {
  constructor(obj) {
    this.request_id = obj.request_id;
    this.prayer = obj.prayer;
    this.isLiked = obj.isLiked;
    this.to_user = obj.to_user;
    this.from_user = obj.from_user;
    this.abuse = obj.abuse;
    this._id = obj._id;
    this.date = obj.date;
    this.req = obj;
  }

  #validateNewPrayer = async () => {
    return {
      request_id: validation.validateId(this.request_id),
      from_user: validation.validateId(this.from_user),
      to_user: validation.validateId(this.to_user),
      prayer: validation.validatePrayer(this.prayer),
      isLiked: validation.validateBoolean(this.isLiked),
      abuse: validation.validateAbuse(this.abuse),
      _id: validation.validateId(this._id),
      date: this.date, // todo : validate date (format => 2022-04-01T17:19:32.857Z)
    };
  };

  #createNewNotification = async (obj) => {
    const newNotification = { user_id: obj.to_user, hasNotification: true };
    const notification = new notify.Notifications(newNotification);

    await notification.save((err) => {
      if (err) return handleError(err);
    });
  };

  #setNotificationAsTrue = async (obj) => {
    await notify.Notifications.findOneAndUpdate(
      { user_id: obj.to_user },
      {
        hasNotification: true,
        isRang: false,
      }
    );
  };

  #setNotificationAsFalse = async (obj) => {
    await notify.Notifications.findOneAndUpdate(
      { user_id: obj.to_user },
      {
        hasNotification: false,
        // isRang: true,
      }
    );
  };

  #updateNotification = async () => {
    try {
      const res = await notify.Notifications.find({ user_id: this.to_user });

      return res.length === 0
        ? await this.#createNewNotification(this.req)
        : res.hasNotification
        ? await this.#setNotificationAsFalse(this.req)
        : await this.#setNotificationAsTrue(this.req);
    } catch (error) {
      utils.logError(error);
    }
  };

  #saveNewPrayer = async (obj) => {
    const prayer = await new prayers.Prayers(obj);
    return await prayer.save((err) => {
      if (err)
        utils.logError({
          message: err.message ? err.message : null,
          error: err,
        });
    });
  };

  init = async () => {
    const validatedObj = await this.#validateNewPrayer();
    await this.#saveNewPrayer(validatedObj);
    await this.#updateNotification();
    return;
  };
};
