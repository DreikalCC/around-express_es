const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.parse(__dirname);
const users = require("../data/users.json");

router.get("/", (req, res) => {
  fs.readFile("./data/users.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    res.send(usersPath);
  });
});

router.get("/:id", (req, res) => {
  if (!users[req.params.id]) {
    res.send(404, "Este usuario no existe");
    return;
  }
  res.send(users[req.params.id]);
});

module.exports = router;
