const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Log = require("../models/log");

//TODO:Work on the online-offline error handler
//TODO:Work on the project switch on/off handler
//TODO:Work on mappings from device name to public key

/**
 * @api {post} log/project/:signature Get all the successfull logs of a user and project
 * @apiGroup Logs
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} signature User signature
 * @apiParam {String[]} devices List of device public keys
 * @apiSuccess {String} sender Public key of sender
 * @apiSuccess {String} receiver Public key of receiver
 * @apiSuccess {String} _id Id of the log
 * @apiSuccess {String} signature signature of the user
 * @apiSuccess {Number} statusCode status code of the log
 * @apiSuccess {Date} date Date of creation
 * @apiParamExample {json} Input
 *    {
 *      "devices":[]
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  [
 *   {
 *       "_id": "5d426995c043f32d5595ea6d",
 *       "sender": "mouse",
 *       "receiver": "fan",
 *       "signature": "holm56290ecfef",
 *       "statusCode": 500,
 *       "timestamp": "2019-08-01T04:24:53.042Z"
 *   }
 *   ]
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

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
/**
 * @api {post} log/all/:signature Get all the logs of a signature
 * @apiGroup Logs
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} signature User signature
 * @apiSuccess {String} sender Public key of sender
 * @apiSuccess {String} receiver Public key of receiver
 * @apiSuccess {String} _id Id of the log
 * @apiSuccess {String} signature signature of the user
 * @apiSuccess {Number} statusCode status code of the log
 * @apiSuccess {Date} date Date of creation
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  [
 *   {
 *       "_id": "5d426995c043f32d5595ea6d",
 *       "sender": "mouse",
 *       "receiver": "fan",
 *       "signature": "holm56290ecfef",
 *       "statusCode": 500,
 *       "timestamp": "2019-08-01T04:24:53.042Z"
 *   }
 *   ]
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
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
