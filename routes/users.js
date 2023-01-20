const express = require("express");
const router = express.Router();

const {
  getUsers,
  getSpecificUser,
  createUser,
  updateProfile,
} = require("../controllers/usersController");

router.get("/", getUsers);

router.get("/:id", getSpecificUser);

router.post("/", createUser);

router.patch("/:id", updateProfile);

module.exports = router;
