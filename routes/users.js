const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/users");

router.get("/", (req, res) => {
  User.find({})
    .orFail()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
});

router.post("/", (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
});

router.patch("/:id", (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {})
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
});

module.exports = router;
