const errLog = require("../models/errorLog");

async function logError(err) {
  const newLog = {
    log: err.message ? err.message : null,
    error: err,
  };

  const res = new errLog.ErrorLog(newLog);

  console.log(err);
  await res.save();
}

module.exports = {
  logError,
};
