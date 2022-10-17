const utils = require("../utils/utils");
const validation = require("../utils/validation");
const fs = require("fs");

const express = require("express");
const router = express.Router();

const scrape = async (obj) => {
  return new Promise((resolve, reject) => {
    const { book, chapter } = obj;
    const chap = chapter < 10 ? `0${chapter}` : chapter;

    const b = book.toLowerCase().replace(/\s/gi, "-");

    fs.readFile(`./bible/${b}/${chap}.json`, "utf8", (error, data) => {
      if (error) {
        utils.logError({ error });
        reject(error);
      }

      resolve(data);
    });
  });
};

router.get("/", async (req, res) => {
  try {
    const { name, chapter } = req.query;
    const obj = {
      book: validation.validateString(name),
      chapter: validation.validateString(chapter),
    };

    const chapt = await scrape(obj);
    const result = JSON.parse(chapt);

    res.status(200).json(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
