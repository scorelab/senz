const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const Device = require("../models/device");
const User = require("../models/user");
const pkMap = require("../models/publicKeyMap");

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
        res.status(200).json("Deleted");
      });
    })
    .catch(err => {
      throw err;
    });
});

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
router.put("/switch", (req, res) => {
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
