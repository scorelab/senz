const mongoose = require("mongoose");

/*
This is the user schema,it will contain list of projects and devices for 
a particular user
*/
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  //One to many relation between user,projects and devices
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
    }
  ],
  signature: { required: true, type: String },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "device"
    }
  ],
  Date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("user", userSchema);
