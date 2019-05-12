const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config')

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
    var {
        name,
        email,
        password
    } = req.body;
    if ((name == '' || email == '' || password == '') || (name == undefined || email == undefined || password == undefined)) {
        res.status(500).json({
            auth: false
        });
    } else {
        var hashedPass = bcrypt.hashSync(req.body.password, 8);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        }, function(err, user) {
            if (err)
                res.status(500).json({
                    auth: false
                });
            var token = jwt.sign({
                id: user._id,
                name: user.name
            }, config.secretKey, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                auth: true
            });

        })
    }
})

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
router.post('/login', function(req, res) {
    var {
        email,
        password
    } = req.body;
    if ((email == '' || password == '') || (email == undefined || password == undefined)) {
        res.status(500).json({
            auth: false
        });
    } else {
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({
                auth: false,
                token: null
            });
            var token = jwt.sign({
                id: user._id,
                name: user.name
            }, config.secretKey, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token
            });
        });
    }
});

//Logout a user
router.get('/logout', function(req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router