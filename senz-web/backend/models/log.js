const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  signature: String,
  statusCode: Number,
  timestamp: Date
});

module.exports = mongoose.model("log", logSchema);
