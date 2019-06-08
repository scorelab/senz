const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const Device = require("../models/device");

/**
 * @api {post} device/:projectId Create a new device
 * @apiGroup Devices
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {projectId} id Project id
 * @apiSuccess {String} name Device name
 * @apiSuccess {String} pubkey Device's public key
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} project Project of the device
 * @apiSuccess {Date} date Date of creation
 * @apiParamExample {json} Input
 *    {
 *      "name": "Device1",
 *      "pubkey":"123#$"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *   "project": {
 *       "id": "5ca5837c93644d45649e73d7"
 *   },
 *   "_id": "5ca5d7a107ddd95f0a2e56b5",
 *   "name": "device1",
 *   "pubkey": "123@#",
 *   "date": "2019-04-04T10:08:33.025Z",
 *   "__v": 0
 *  }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
//Create a new device
router.post("/new", jwtVerify, (req, res) => {
  Device.create(req.body)
    .then(createdDevice => {
      res.json(createdDevice);
    })
    .catch(err => {
      throw err;
    });
});

/**
 * @api {delete} delete/:deviceId Remove a device of a project
 * @apiGroup Devices
 * @apiParam {deviceId} id Device id
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * {
 *     "Deleted"
 * }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
//Delete a device
router.delete("/delete/:deviceId", jwtVerify, (req, res) => {});

//Get all devices
router.get("/all", (req, res) => {
  Device.find()
    .then(AllDevices => {
      res.json(AllDevices);
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
