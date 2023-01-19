const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Card = require("../models/cards");

const cardsPath = path.join("data", "cards.json");

router.get("/", (req, res) => {
  Card.find({})
    .orFail()
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
});

router.post("/", (req, res) => {
  const { name, link } = req.body;
  const { owner } = req.user._id;
  Card.create({ name, link, owner })
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
});

router.delete("/:id", (req, res) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
});

module.exports = router;
