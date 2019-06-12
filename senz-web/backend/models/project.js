const mongoose = require("mongoose");

/*
This is the project schema, it will contain the name of the project and
the list of devices which comes under it
*/
const projectSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  devices: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("project", projectSchema);
