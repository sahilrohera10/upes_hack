const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    imageId:String,
 name:String,
 description : String
});

module.exports = mongoose.model("service", serviceSchema);
