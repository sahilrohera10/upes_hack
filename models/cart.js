const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
 customerId : String,
 serviceId :  String,
 name : String,
});

module.exports = mongoose.model("carts", cartSchema);
