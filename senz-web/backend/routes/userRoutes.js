const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtVerify = require("./verifyTokens");
const uuidv4 = require("uuid/v4");
const validator = require("email-validator");

//Signature producing function
const getSignature = username => {
  const uniqueId = uuidv4();
  const fullUsername = username.split(" ");
  const firstName = fullUsername[0];
  const tillFlag = firstName.length > 4 ? 4 : firstName.length;
  return (
    username.substr(0, tillFlag) +
    String(Date.now()).substr(
      String(Date.now()).length - 4,
      String(Date.now()).length
    ) +
    uniqueId.substr(0, 6)
  );
};
/**
 * @api {post} api/register Register a new user
 * @apiGroup Users
 * @apiParam {String} name username
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParamExample {json} Input
 *    {
 *      "name": "Yash",
 *      "email": "yash123@gmail.com",
 *      "password":"yash123"
 *    }
 * @apiSuccess {String} token token
 * @apiSuccess {Boolean} auth authentication state
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "auth": true
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "auth":false
 *    }
 */

//Register a new user
router.post("/register", function(req, res) {
  var { name, email, password } = req.body;
  if (
    name == "" ||
    email == "" ||
    password == "" ||
    (name == undefined || email == undefined || password == undefined) ||
    !validator.validate(email)
  ) {
    res.status(500).json({
      auth: false,
      token: null
    });
  } else {
    var hashedPass = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        signature: getSignature(String(req.body.name))
      },
      function(err, user) {
        if (err)
          res.status(500).json({
            auth: false,
            token: null
          });
        var token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            signature: user.signature,
            email: user.email
          },
          config.secretKey,
          {
            expiresIn: 86400 // expires in 24 hours
          }
        );
        res.status(200).json({
          auth: true,
          token: token
        });
      }
    );
  }
});

/**
 * @api {post} api/login Login a new User
 * @apiGroup Users
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParamExample {json} Input
 *    {
 *      "email": "yash123@gmail.com",
 *      "password":"yash123"
 *    }
 * @apiSuccess {String} token token
 * @apiSuccess {Boolean} auth authentication state
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "auth": true,
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs"
 *    }
 * @apiErrorExample {json} Login error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "Error on the server."
 *    }
 *    HTTP/1.1 404 Not Found
 *    {
 *      "No user found"
 *    }
 *    HTTP/1.1 401
 *    {
 *      "auth":false,
 *       "token":null
 *    }
 
 */
//Login an existing user
router.post("/login", function(req, res) {
  var { email, password } = req.body;
  if (
    email == "" ||
    password == "" ||
    (email == undefined || password == undefined) ||
    !validator.validate(email)
  ) {
    res.status(500).json({
      auth: false,
      token: null
    });
  } else {
    User.findOne(
      {
        email: req.body.email
      },
      function(err, user) {
        if (err) return res.status(500).send("Error on the server.");
        if (!user) return res.status(404).send("No user found.");
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid)
          return res.status(401).send({
            auth: false,
            token: null
          });
        var token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            signature: user.signature,
            email: user.email
          },
          config.secretKey,
          {
            expiresIn: 86400 // expires in 24 hours
          }
        );
        res.status(200).send({
          auth: true,
          token: token
        });
      }
    );
  }
});

//Logout a user
router.get("/logout", function(req, res) {
  res.status(200).send({
    auth: false,
    token: null
  });
});

/**
 * @api {put} api/:userId/update Update password of the user
 * @apiGroup Users
 * @apiSuccess {String} name name
 * @apiSuccess {String} id user id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "name": "Yash",
 *      "id":"userId"
 *    }
 * @apiErrorExample {json} Login error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "auth":false
 *    }
 *
 */
//Updating the user
router.put("/:userId/update", jwtVerify, (req, res) => {
  const userId = req.params.userId;
  const hashedPass = bcrypt.hashSync(req.body.newPassword, 8);
  User.findById(userId).then(user => {
    const passwordisvalid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );
    if (!passwordisvalid) {
      res.status(401).send({
        auth: false
      });
    } else {
      User.findByIdAndUpdate(
        userId,
        {
          $set: { password: hashedPass }
        },
        { new: true }
      ).then(updatedUser => {
        res.status(200).json({ name: updatedUser.name, id: updatedUser._id });
      });
    }
  });
});

module.exports = router;
