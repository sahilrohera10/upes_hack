const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  emailid: String,
  otp: Number,
});

module.exports = mongoose.model("otps", OtpSchema);
