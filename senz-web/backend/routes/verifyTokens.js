const jwt = require("jsonwebtoken");
const config = require("config");
/*
This is the middleware function to protect all the 
routes
*/
function verifyToken(req, res, next) {
  var token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({
      auth: false,
      message: "No token provided."
    });
  jwt.verify(token, config.secretKey, function(err, decoded) {
    if (err)
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate token."
      });
    // if everything good, save to request for use in other routes
    next();
  });
}
module.exports = verifyToken;
