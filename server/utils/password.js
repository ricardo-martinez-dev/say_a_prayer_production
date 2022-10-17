const bcrypt = require("bcrypt");
const saltRounds = 10;
const validation = require("./validation");

const hashPassword = async (el) => {
  const pass = validation.validatePassword(el);
  const hashedPassword = async (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  };

  return await hashedPassword(pass);
};

const unhashPassword = async (obj) => {
  return await new Promise((resolve, reject) => {
    const { password, user } = obj;
    const pass = validation.validatePassword(password);

    bcrypt.compare(pass, user.password, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  hashPassword,
  unhashPassword,
};
