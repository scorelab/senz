const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const User = require("../models/user");
const Device = require("../models/device");
const mongoose = require("mongoose");

//Get all the projects of a particular user
router.get("/:userid/all", jwtVerify, (req, res) => {
  User.findById(req.params.userid)
    .populate("projects")
    .exec((err, user) => {
      res.status(200).json(user.projects);
    });
});

//Post a new project for a particular user
router.post("/:userid/new", jwtVerify, (req, res) => {
  const userId = req.params.userid;
  const projectName = req.body.name;
  const projectDesc = req.body.description;
  const project = {
    name: projectName,
    description: projectDesc
  };
  User.findById(userId).then(user => {
    Project.create(project).then(newProject => {
      user.projects.push(newProject);
      user.save();
      res.status(200).json(newProject);
    });
  });
});

//Delete a particular project of a particular user
router.delete("/:userId/delete/:projectId", jwtVerify, (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  //Remove the project from all the devices it was included in
  Project.findById(projectId)
    .then(project => {
      project.devices.map(proDevice => {
        Device.findById(proDevice._id)
          .then(device => {
            device.projects = device.projects.filter(devProjectId => {
              return projectId !== devProjectId;
            });
          })
          .catch(err => {
            throw err;
          });
      });
    })
    .catch(err => {
      throw err;
    });
  //Remove the project from the user list
  User.findById(userId).then(user => {
    user.projects.remove(mongoose.Types.ObjectId(projectId));
    user
      .save()
      .catch(err => {
        throw err;
      })
      .catch(err => {
        throw err;
      });
  });
  //Remove the project
  Project.findByIdAndDelete(projectId)
    .then(delProject => {
      res.status(200).json(delProject);
    })
    .catch(err => {
      throw err;
    });
});
//Get the detail of a particular project
router.get("/:projectId/info", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId).then(project => {
    res.status(200).json(project);
  });
});
//Update the status of the project
router.put("/:projectId/status", (req, res) => {
  const projectId = req.params.projectId;
  Project.findByIdAndUpdate(
    projectId,
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then(updatedProject => {
      res.status(200).json(updatedProject);
    })
    .catch(err => {
      throw err;
    });
});
const giveDate = date => {
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    (date.getYear() + 1900) +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};
//Add a device to the project
router.post("/:projectId/deviceAdd", jwtVerify, (req, res) => {
  const { pubkey } = req.body;
  const projectId = req.params.projectId;
  Device.findOne({ pubkey }).then(foundDevice => {
    // //Create the device
    const { name, _id, status, pubkey } = foundDevice;
    const device = {
      name,
      _id,
      status,
      pubkey,
      date: giveDate(new Date(Date.now()))
    };
    //Find the project and push to the devices array
    Project.findByIdAndUpdate(
      projectId,
      { $push: { devices: device } },
      { new: true }
    )
      .then(updatedProject => {
        foundDevice.projects.push(projectId);
        foundDevice.save();
        res.status(200).json(device);
      })
      .catch(err => {
        throw err;
      });
  });
});
//Update the information of the project
router.put("/:projectId/info", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  Project.findByIdAndUpdate(
    projectId,
    {
      $set: { name: req.body.name, description: req.body.description }
    },
    { new: true }
  )
    .then(updatedProject => {
      res.status(200).json(updatedProject);
    })
    .catch(err => {
      throw err;
    });
});
//Remove a list of devices from a project
router.put("/:projectId/delDevice", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  const deviceList = req.body.devices;
  Project.findById(projectId)
    .then(project => {
      deviceList.map(deviceId => {
        Device.findById(deviceId).then(device => {
          const updatedProjectList = device.projects.filter(id => {
            return id !== projectId;
          });
          device.projects = updatedProjectList;
          device.save();
        });
      });
      const upDatedDeviceList = project.devices.filter(device => {
        return !deviceList.includes(device._id.toString());
      });
      project.devices = upDatedDeviceList;
      project.save().then(savedProject => {
        res.status(200).json(savedProject);
      });
    })
    .catch(err => {
      throw err;
    });
});
module.exports = router;
