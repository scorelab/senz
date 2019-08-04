const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const User = require("../models/user");
const Device = require("../models/device");
const mongoose = require("mongoose");
const pkMaps = require("../models/publicKeyMap");

/**
 * @api {get} project/:userid/all Get all the projects of a user
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} id User id
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {Object[]} Projects Project's list
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *      "status":true,
 *       "devices": [],
 *       "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *       "date": "2019-04-04T04:09:32.895Z",
 *       "description":"Description of the project",
 *       "__v": 0
 *      }
 *    ]
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
//Get all the projects of a particular user
router.get("/:userid/all", jwtVerify, (req, res) => {
  User.findById(req.params.userid)
    .populate("projects")
    .exec((err, user) => {
      res.status(200).json(user.projects);
    });
});

/**
 * @api {post} project/:userid/new Create a new project
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} id User id
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiParamExample {json} Input
 *    {
 *      "name": "Project1",
 *      "description":"Description of the project"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":true,
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
 *      "description":"Description of the project",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
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
/**
 * @api {delete} project/:userId/delete/:projectId Delete the project of a user
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} userId User id
 * @apiParam {String} projectId Project id
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":true,
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
 *      "description":"Description of the project",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
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
  //Remove the project from the pkMaps
  Project.findById(projectId).then(foundProject => {
    foundProject.devices.forEach(device => {
      Device.findById(device._id).then(foundDevice => {
        pkMaps.find({ publicKey: foundDevice.pubkey }).then(arrayMaps => {
          arrayMaps.forEach(pkMap => {
            pkMap.projects = pkMap.projects.filter(pId => {
              return pId !== projectId;
            });
            pkMap.save();
          });
        });
      });
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
/**
 * @api {get} project/:projectId/info Get the details of a project
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} projectId Project id
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":true,
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
 *      "description":"Description of the project",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
//Get the detail of a particular project
router.get("/:projectId/info", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId).then(project => {
    res.status(200).json(project);
  });
});
/**
 * @api {put} project/:projectId/status Update the status of the project
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} projectId Project id
 * @apiParam {Boolean} status Status of the project
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiParamExample {json} Input
 *    {
 *      "status": "true"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":true,
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
 *      "description":"Description of the project",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
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
/**
 * @api {post} project/:projectId/deviceAdd Add a device to the project
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} projectId Project id
 * @apiParam {String} pubkey Public key of the device
 * @apiSuccess {Boolean} status Device status
 * @apiSuccess {String} name Device name
 * @apiSuccess {String} _id Id of the device
 * @apiSuccess {String} pubkey Public key of the device
 * @apiSuccess {Date} date Date of creation
 * @apiParamExample {json} Input
 *    {
 *      "pubkey": "devicePub1"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *      "name": "mouse",
 *      "_id": "5d42682f49678227a8133ec1",
 *      "status": true,
 *      "pubkey": "mouse",
 *      "date": "4/8/2019 15:49:18"
 *  }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
//Add a device to the project
router.post("/:projectId/deviceAdd", jwtVerify, (req, res) => {
  const { pubkey } = req.body;
  const projectId = req.params.projectId;
  //Add the project to the pkMaps
  pkMaps.findOne({ publicKey: pubkey }).then(foundLog => {
    foundLog.projects.push(projectId);
    foundLog.save();
  });
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
      { new: true, useFindAndModify: false }
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
/**
 * @api {put} project/:projectId/info Update project information
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} projectId Project id
 * @apiParam {String} name Name of the project
 * @apiParam {String} description Description of the project
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiParamExample {json} Input
 *    {
 *      "name": "Project1",
 *      "description":"Description of the project"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":true,
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
 *      "description":"Description of the project",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */
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
/**
 * @api {put} project/:projectId/delDevice Delete a list of devices
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {String} projectId Project id
 * @apiParam {String[]} devices Array of device id(s)
 * @apiSuccess {Boolean} status Project's status
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccess {String} description Description of the project
 * @apiParamExample {json} Input
 *    {
 *      "devices":[]
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":true,
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
 *      "description":"Description of the project",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */

//Remove a list of devices from a project
router.put("/:projectId/delDevice", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  const deviceList = req.body.devices;
  //Remove them from the pkMaps
  deviceList.forEach(deviceId => {
    Device.findById(deviceId).then(foundDevice => {
      pkMaps.findOne({ publicKey: foundDevice.pubkey }).then(pkMap => {
        pkMap.projects = pkMap.projects.filter(pId => {
          return pId !== projectId;
        });
        pkMap.save();
      });
    });
  });
  //Remove them from the projects
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
