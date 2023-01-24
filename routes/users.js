const express = require("express");
const router = express.Router();

const {
  getUsers,
  getSpecificUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/usersController");

router.get("/", getUsers);

router.get("/:id", getSpecificUser);

router.post("/", createUser);

router.patch("/me", updateProfile);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
