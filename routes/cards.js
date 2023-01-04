const express = require("express");
const router = express.Router();
const path = require("path");
const cards = require("../data/cards.json");

router.get("/", (req, res) => {
  res.send(cards);
});

module.exports = router;
