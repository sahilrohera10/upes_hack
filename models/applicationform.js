const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  customerId: String,
  name: String,
  email: String,
  contactNo: Number,
  services: [String],
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
  url:String,
  DoneStatus:String,
  Payment:Number
});

module.exports = mongoose.model("forms", formSchema);
