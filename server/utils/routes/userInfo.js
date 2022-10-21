const posts = require("../../models/user");
const utils = require("../utils");
const validation = require("../validation");
const passHash = require("../password");

const getBirthDay = (bday) => {
  // format birhtday
  const splitBday = bday.split("-");
  const day = splitBday[2];
  const month = splitBday[1];
  const year = splitBday[0];

  return validation.validateDate(`${day}-${month}-${year}`);
};

const query = async (elem) => {
  try {
    const user_id = validation.validateId(elem.user_id);
    const isRecruter = user_id === "62c87954db8aa92094e6c7b1";

    const validatedobj = {
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
    };

    for (const [key, value] of Object.entries(validatedobj)) {
      if (!value) return;
    }

    await posts.User.findByIdAndUpdate(user_id, validatedobj);

    return elem;
  } catch (error) {
    utils.logError(error);
    throw error;
  }
};

module.exports = { query };
