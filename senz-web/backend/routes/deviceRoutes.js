const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const Device = require("../models/device");
const User = require("../models/user");
const pkMap = require("../models/publicKeyMap");

/**
 * @api {post} device/:userId/new Create a new device for a user
 * @apiGroup Devices
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} userId User id
 * @apiSuccess {String} pubkey Device public key
 * @apiSuccess {String} name Device name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Boolean} status status of the project
 * @apiSuccess {Number} sent successfull send requests by the device
 * @apiSuccess {Number} received successfull receive requests by the device
 * @apiSuccess {Object[]} projects List of projects the device is a part of
 * @apiSuccess {Date} date Date of creation
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *   "projects": [],
 *   "sent": 0,
 *   "received": 0,
 *   "status": true,
 *   "_id": "5d47116bcec70c4d058d6753",
 *   "name": "dev1",
 *   "pubkey": "dev1",
 *   "date": "2019-08-04T17:10:03.096Z",
 *   "__v": 0
 *  }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
//Create a new device for a particular user
router.post("/:userId/new", jwtVerify, (req, res) => {
  const userId = req.params.userId;
  User.findById(userId).then(foundUser => {
    //Enter in the pkMaps
    const pkEntry = {
      publicKey: req.body.pubkey,
      signature: foundUser.signature
    };
    pkMap.create(pkEntry).catch(err => {
      throw err;
    });
  });

  User.findById(userId)
    .then(user => {
      Device.create(req.body)
        .then(newDevice => {
          user.devices.push(newDevice);
          user.save();
          res.status(200).json(newDevice);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
});
/**
 * @api {delete} device/:userId/delete/:deviceId Delete a device for a user
 * @apiGroup Devices
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} userId User id
 * @apiParam {String} deviceId Device id
 * @apiSuccess {String} message delete message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *   "message":"Deleted"
 *  }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
//Delete a device for a particular user
router.delete("/:userId/delete/:deviceId", jwtVerify, (req, res) => {
  const userId = req.params.userId;
  const deviceId = req.params.deviceId;
  //Remove from the pkMap
  Device.findById(deviceId).then(foundDevice => {
    pkMap.findOneAndDelete({ publicKey: foundDevice.pubkey }).catch(err => {
      throw err;
    });
  });
  //Remove the device
  Device.findByIdAndDelete(deviceId).catch(err => {
    throw err;
  });
  //Remove from user device's list
  User.findById(userId)
    .then(user => {
      user.devices.remove(deviceId);
      user.save().then(pr => {
        res.status(200).json({ message: "Deleted" });
      });
    })
    .catch(err => {
      throw err;
    });
});
/**
 * @api {get} device/:userId/all Get all the devices of a particular user
 * @apiGroup Devices
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} userId User id
 * @apiSuccess {String} pubkey Device public key
 * @apiSuccess {String} name Device name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Boolean} status status of the project
 * @apiSuccess {Number} sent successfull send requests by the device
 * @apiSuccess {Number} received successfull receive requests by the device
 * @apiSuccess {Object[]} projects List of projects the device is a part of
 * @apiSuccess {Date} date Date of creation
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
 * {
 *   "projects": [],
 *   "sent": 0,
 *   "received": 0,
 *   "status": true,
 *   "_id": "5d47116bcec70c4d058d6753",
 *   "name": "dev1",
 *   "pubkey": "dev1",
 *   "date": "2019-08-04T17:10:03.096Z",
 *   "__v": 0
 * }
 * ]
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
//Get all devices of a particular user
router.get("/:userid/all", jwtVerify, (req, res) => {
  User.findById(req.params.userid)
    .populate("devices")
    .exec((err, user) => {
      if (err) throw err;
      res.status(200).json(user.devices);
    });
});

//Switch the devices of the user
const switchProjects = (projectArray, deviceId, status) => {
  return new Promise((resolve, reject) => {
    const promiseArray = [];
    if (projectArray.length) {
      projectArray.forEach(projectId => {
        Project.findById(projectId).then((project, prIndex, prArr) => {
          project.devices.forEach((device, index, arr) => {
            if (device._id == deviceId) {
              device.status = status;
            }
            project.devices.set(index, device);
          });
          promiseArray.push(project.save());
        });
      });
    } else {
      resolve("done");
    }
    Promise.all(promiseArray).then(result => {
      resolve("done");
    });
  });
};
/**
 * @api {get} device/switch Switch the status of a list of devices
 * @apiGroup Devices
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String[]} devices List of device id
 * @apiParam {Boolean} status Status of the device
 * @apiSuccess {String} pubkey Device public key
 * @apiSuccess {String} name Device name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Boolean} status status of the project
 * @apiSuccess {Number} sent successfull send requests by the device
 * @apiSuccess {Number} received successfull receive requests by the device
 * @apiSuccess {Object[]} projects List of projects the device is a part of
 * @apiSuccess {Date} date Date of creation
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
 * {
 *   "projects": [],
 *   "sent": 0,
 *   "received": 0,
 *   "status": true,
 *   "_id": "5d47116bcec70c4d058d6753",
 *   "name": "dev1",
 *   "pubkey": "dev1",
 *   "date": "2019-08-04T17:10:03.096Z",
 *   "__v": 0
 * }
 * ]
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put("/switch", jwtVerify, (req, res) => {
  const promiseArray = [];
  const { devices, status } = req.body;
  devices.forEach(deviceId => {
    const deviceUpdate = Device.findByIdAndUpdate(
      deviceId,
      { $set: { status } },
      { new: true }
    );
    promiseArray.push(deviceUpdate);
  });

  Promise.all(promiseArray).then(result => {
    const subPromiseArray = [];
    result.forEach(device => {
      const projectUpdate = switchProjects(
        device.projects,
        device._id,
        device.status
      );
      subPromiseArray.push(projectUpdate);
    });
    Promise.all(subPromiseArray).then(projectResult => {
      res.json(result).status(200);
    });
  });
});

module.exports = router;
