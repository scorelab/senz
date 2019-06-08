var mongoose = require("mongoose");
/*
This is the basic device schema which will be modified during the course of the project 
*/

var deviceSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  pubkey: {
    required: true,
    type: String
  },
  projects: {
    type: Array
  },
  sent: {
    type: Number,
    default: 0
  },
  received: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("device", deviceSchema);
