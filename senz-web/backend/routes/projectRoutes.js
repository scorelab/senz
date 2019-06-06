const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const User = require("../models/user");
const Device = require("../models/device");

/**
 * @api {get} project/:userid/all Get all the projects of a user
 * @apiGroup Projects
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *
 *     }
 * @apiParam {userId} id User id
 * @apiSuccess {Object[]} Projects Project's list
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *       "devices": [],
 *       "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *       "date": "2019-04-04T04:09:32.895Z",
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
      res.json(user.projects);
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
 * @apiParam {userId} id User id
 * @apiSuccess {String} name Project name
 * @apiSuccess {String} _id Id of the project
 * @apiSuccess {Object[]} devices Devices of a project
 * @apiSuccess {Date} date Date of creation
 * @apiParamExample {json} Input
 *    {
 *      "name": "Project1"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "devices": [],
 *      "_id": "5ca5837c93644d45649e73d7",
 *      "name": "Project1",
 *      "date": "2019-04-04T04:09:32.895Z",
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
      res.json(newProject);
    });
  });
});

/**
 * @api {delete} project/:userId/delete/:projectId Remove a project of a user
 * @apiGroup Projects
 * @apiParam {userId} id User id
 * @apiParam {projectId} id Project id
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
//Delete a particular project of a particular user
router.delete("/:userId/delete/:projectId", jwtVerify, (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  User.findById(userId).then(user => {
    user.projects.remove(projectId);
    user.save().then(pr => {
      res.json("Deleted");
    });
  });
});
//Get the detail of a particular project
router.get("/:projectId/info", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId).then(project => {
    res.json(project);
  });
});
//Update the status of the project
router.put("/:projectId/status", jwtVerify, (req, res) => {
  const projectId = req.params.projectId;
  Project.findByIdAndUpdate(
    projectId,
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then(updatedProject => {
      res.json(updatedProject);
    })
    .catch(err => {
      throw err;
    });
});
//Add a device to the project
router.post("/:projectId/deviceAdd", jwtVerify, (req, res) => {
  const { pubkey } = req.body;
  const projectId = req.params.projectId;
  Device.findOne({ pubkey }).then(foundDevice => {
    // //Create the device
    const { name, _id, status, pubkey } = foundDevice;
    const device = { name, _id, status, pubkey, date: Date.now() };
    //Find the project and push to the devices array
    Project.findByIdAndUpdate(
      projectId,
      { $push: { devices: device } },
      { new: true }
    )
      .then(updatedProject => {
        foundDevice.projects.push(projectId);
        foundDevice.save();
        res.json(updatedProject);
      })
      .catch(err => {
        throw err;
      });
  });
});

module.exports = router;
