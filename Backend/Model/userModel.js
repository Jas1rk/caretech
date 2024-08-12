const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
