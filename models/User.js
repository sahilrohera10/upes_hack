const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
 contactNo:Number,
  otp: Number,
  url:String
});

module.exports = mongoose.model("Users", UserSchema);
