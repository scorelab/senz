const express = require("express");
const router = express.Router();
const jwtVerify = require("./verifyTokens");
const Project = require("../models/project");
const User = require("../models/user");


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

    User.findById(req.params.userid).populate("projects").exec((err, user) => {
        res.json(user.projects)
    })


})

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
    var userId = req.params.userid;
    var projectName = req.body.name;
    var project = {
        name: projectName
    };
    User.findById(userId).then((user) => {
        Project.create(project).then((newProject) => {
            user.projects.push(newProject);
            user.save();
            res.json(newProject)
        })
    })
})

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
    var userId = req.params.userId;
    var projectId = req.params.projectId;
    User.findById(userId).then((user) => {
        user.projects.remove(projectId);
        console.log(user)
        user.save().then((pr) => {
            res.json("Deleted");
        })
    })


})


module.exports = router;