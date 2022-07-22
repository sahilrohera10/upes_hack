const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
 customerId:String,
 name:String,
 email:String,
 contactNo:Number,
 services:String,
});

module.exports = mongoose.model("forms", formSchema);
