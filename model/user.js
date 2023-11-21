const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralcode: {
    type: String,
  },
  referredby: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
