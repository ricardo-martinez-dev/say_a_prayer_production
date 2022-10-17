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
      fname: validation.validateShortString(elem.fname),
      lname: validation.validateShortString(elem.lname),
      bday: getBirthDay(elem.bday),
      religion: validation.validateLongString(elem.religion),
      denomination: validation.validateLongString(elem.denomination),
      country: validation.validateLongString(elem.country),
      languages: validation.validateLanguages(elem.languages),
      password: isRecruter
        ? await passHash.hashPassword("ProgrammingIsFun123!")
        : await passHash.hashPassword(elem.password),
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
