const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

//Database URI configuration
/*
Use the given URI from the environment file if given,
or else use the uri for docker
*/
const URI = config.dbURI || "mongodb://mongo:27017/senz";

if (config.util.getEnv("NODE_ENV") === "test") {
  let Mockgoose = require('mockgoose').Mockgoose;
  let mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion("4.0.3");
  mockgoose.prepareStorage().then(function () {
    mongoose.connect(config.testDbURI, { useNewUrlParser: true, useCreateIndex: true }).then(e => {
      console.log("Test Database Connected");
    })
      .catch(err => {
        throw err;
      });;
  })
} else {
  mongoose
    .connect(URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(e => {
      console.log("Database Connected");
    })
    .catch(err => {
      throw err;
    });
}
//Configuring the express instance
// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable all CORS requests
app.use(cors());

app.use(express.static("public"));

//If executing in test environment then prevent logging
if (config.util.getEnv("NODE_ENV") !== "test") {
  // log HTTP requests
  app.use(morgan("combined"));
}

//Requiring Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const logRoutes = require("./routes/logRoutes");

//Using Routes
app.use("/api", userRoutes);
app.use("/project", projectRoutes);
app.use("/device", deviceRoutes);
app.use("/log", logRoutes);

//Starting the server
app.listen(port, err => {
  if (err) throw err;
  console.log("Server running at port " + port);
});

module.exports = app; // for testing
