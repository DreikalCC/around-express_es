const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/users");

const usersPath = path.join("data", "users.json");

router.get("/", (req, res) => {
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    res.send(data);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    const dataObj = JSON.parse(data);
    const findData = dataObj.find((item) => {
      return item._id === id;
    });
    if (!findData) {
      res.status(404).send({ status: false, message: "user not found" });
      return;
    }
    res.send(findData);
  });
});

router.post("/", (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error" });
    });
});

module.exports = router;
