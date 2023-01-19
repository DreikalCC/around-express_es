const mongoose = require("mongoose");
const User = require("./users").schema;

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: {
    type: String,
    required: [true, "Dirección URL requerida"],
  },
  owner: User,
  likes: [{ users: "", ObjectId: "", default: "" }],
  createdAt: Date,
});

module.exports = mongoose.model("card", cardSchema);
