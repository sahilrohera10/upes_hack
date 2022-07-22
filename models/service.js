const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
 name:String,
 description : String
});

module.exports = mongoose.model("service", serviceSchema);
