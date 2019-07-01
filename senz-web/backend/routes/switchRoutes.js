const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const Project = require("../models/project");
const Device = require("../models/device");
const error = require("./errors");

router.post("/check", (req, res) => {
  const { userId, projectId, sender, receiver } = req.body;
  const errorObj = { error: 500 };
  var promiseArray = [];
  //Check if user exists
  const userCheck = User.findById(userId);
  userCheck.then(user => {
    if (!user) errorObj["error"] = 501;
  });
  promiseArray.push(userCheck);
  //Check if project exists
  const projectCheck = Project.findById(projectId);
  projectCheck.then(project => {
    if (!project) errorObj["error"] = 502;
    if (!project.status) errorObj["error"] = 506;
  });
  promiseArray.push(projectCheck);
  //Check if project belong to the user
  const userProject = User.findById(userId);
  userProject.then(user => {
    if (!user.projects.includes(projectId)) errorObj["error"] = 503;
  });
  promiseArray.push(userProject);
  //Check if sender and receiver belong to the same project
  const sameProject = Project.findById(projectId);
  sameProject.then(project => {
    const pubKeys = project.devices.map(device => {
      return device.pubkey;
    });
    if (!pubKeys.includes(sender)) errorObj["error"] = 504;
    if (!pubKeys.includes(receiver)) errorObj["error"] = 504;
  });
  promiseArray.push(sameProject);
  //Check if sender exists and is online
  const senderChecker = Device.findOne({ pubkey: sender });
  senderChecker.then(device => {
    if (!device.status) errorObj["error"] = 505;
  });
  promiseArray.push(senderChecker);
  //Check if receiver exists and is online
  const receiverChecker = Device.findOne({ pubkey: receiver });
  receiverChecker.then(device => {
    if (!device.status) errorObj["error"] = 505;
  });
  promiseArray.push(receiverChecker);
  //Finally
  Promise.all(promiseArray).then(result => {
    res.json(errorObj);
  });
});

module.exports = router;
