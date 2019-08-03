const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Log = require("../models/log");

//Get all the SUCCESSFULL logs of a particular signature and project(list of devices)
router.post("/project/:signature", jwtVerify, (req, res) => {
  const allDevices = req.body.devices;
  const signature = req.params.signature;
  const response = [];
  Log.find({ signature })
    .then(logArr => {
      logArr.forEach((indLog, index, arr) => {
        if (allDevices.includes(indLog.sender) && indLog.statusCode == 500) {
          response.push(indLog);
        } else if (
          allDevices.includes(indLog.receiver) &&
          indLog.statusCode == 500
        ) {
          response.push(indLog);
        }
        if (index === arr.length - 1) {
          res.json(response);
        }
      });
    })
    .catch(err => {
      res.json({ message: "Internal server error" }).status(500);
    });
});

//Get all the logs of a particular signature
router.post("/all/:signature", (req, res) => {
  const signature = req.params.signature;
  const response = [];
  const { devices } = req.body;
  Log.find({ signature }).then(logArr => {
    logArr.forEach((indLog, index, arr) => {
      if (devices.includes(indLog.sender)) {
        response.push(indLog);
      } else if (devices.includes(indLog.receiver)) {
        response.push(indLog);
      }
      if (index == arr.length - 1) {
        res.json(response);
      }
    });
  });
});

//Get all the SUCCESSFULL sends and receives of a particular device of a particular user
router.get("/:publicKey/:signature", jwtVerify, (req, res) => {
  const publicKey = req.params.publicKey;
  const signature = req.params.signature;
  const response = { sent: 0, received: 0 };
  Log.find({ signature }).then(logArr => {
    logArr.forEach((log, index, arr) => {
      if (log.sender === publicKey && log.statusCode === 500) {
        response.sent++;
      } else if (log.receiver === publicKey && log.statusCode === 500) {
        response.received++;
      }
      if (index === arr.length - 1) {
        res.json(response);
      }
    });
  });
});

module.exports = router;
