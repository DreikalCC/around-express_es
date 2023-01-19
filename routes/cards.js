const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  getCards,
  postCard,
  deleteCard,
} = require("../controllers/cardsController");

router.get("/", getCards);

router.post("/", postCard);

router.delete("/:id", deleteCard);

module.exports = router;
