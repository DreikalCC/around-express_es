const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  getUsers,
  getSpecificUser,
  createUser,
  updateProfile,
} = require("../controllers/usersController");
const User = require("../models/user");

router.get("/", getUsers);

router.get("/:id", getSpecificUser);

router.post("/", createUser);

router.patch("/:id", updateProfile);

module.exports = router;
