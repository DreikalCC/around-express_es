const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardsController");

router.get("/", getCards);

router.post("/", postCard);

router.delete("/:id", deleteCard);

router.put("/:id", likeCard);

router.delete("/:id", dislikeCard);

module.exports = router;
