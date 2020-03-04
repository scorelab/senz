const mongoose = require("mongoose");

const pkMapSchema = new mongoose.Schema({
  publicKey: {
    required: true,
    type: String
  },
  signature: String,
  projects: {
    type: Array
  }
});

module.exports = mongoose.model("pkMap", pkMapSchema);
