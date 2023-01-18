const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "Dirección URL requerida"],
    validate: validator.isURL({
      message: "Must be a Valid URL",
      protocols: ["http", "https", "www."],
      require_tld: true,
      require_protocol: true,
    }),
  },
});

module.exports = mongoose.model("user", userSchema);
