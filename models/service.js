const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("service", serviceSchema);
