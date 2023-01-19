const mongoose = require("mongoose");
const User = require("./user").schema;

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: {
    type: String,
    required: [true, "Dirección URL requerida"],
  },
  owner: { type: [mongoose.Schema.Types.ObjectId], required: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  createdAt: Date,
});

module.exports = mongoose.model("card", cardSchema);
