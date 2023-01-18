const mongoose = require("mongoose");
const User = require("./users");

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: {
    type: String,
    required: [true, "Dirección URL requerida"],
    validate: validator.isURL({
      message: "Must be a Valid URL",
      protocols: ["http", "https", "www."],
      require_tld: true,
      require_protocol: true,
    }),
  },
  owner: User,
  likes: [{ users: users, ObjectId: __dirname, default: "" }],
  createdAt: Date.now,
});

module.exports = mongoose.model("card", cardSchema);
