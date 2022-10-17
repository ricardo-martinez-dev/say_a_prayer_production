const notify = require("../models/notifications");
const utils = require("../utils/utils");

class Notification {
  constructor(obj) {
    this.obj = obj;
  }

  createNewNotification = async (obj) => {
    const newNotification = { user_id: obj.to_user, hasNotification: true };
    const notification = new notify.Notifications(newNotification);

    await notification.save((err) => {
      if (err) return handleError(err);
    });
  };

  setNotificationAsTrue = async (obj) => {
    await notify.Notifications.findOneAndUpdate(
      { user_id: obj.to_user },
      {
        hasNotification: true,
      }
    );
  };

  setNotificationAsFalse = async (obj) => {
    await notify.Notifications.findOneAndUpdate(
      { user_id: obj.to_user },
      { hasNotification: false }
    );
  };

  updateNotification = async (obj) => {
    try {
      // ------------
      const res = await notify.Notifications.find({ user_id: obj.to_user });

      res.length === 0
        ? await this.createNewNotification(obj)
        : res.hasNotification
        ? await this.setNotificationAsFalse(obj)
        : await this.setNotificationAsTrue(obj);

      // ------------
    } catch (error) {
      utils.logError(error);
    }
  };
}
