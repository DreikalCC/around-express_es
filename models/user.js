const mongoose = require("mongoose");
const validator = require("validator");

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
    validate: () =>
      validator.isURL(this.avatar, {
        message: "debe ser una RUL valida",
        protocols: ["http", "https", "www."],
        require_tld: true,
        require_protocol: true,
      }),
  },
});

module.exports = mongoose.model("user", userSchema);
