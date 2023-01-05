const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

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
    res.send(findData);
  });
});

module.exports = router;
