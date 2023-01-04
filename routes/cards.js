const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const cardsPath = path.join("data", "cards.json");

router.get("/", (req, res) => {
  fs.readFile(cardsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    res.send(data);
  });
});

module.exports = router;
