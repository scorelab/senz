const logger = require("../utils/winstonConfig");
const sendQuery = (socket, msg) => {
  return new Promise((resolve, reject) => {
    socket.write(msg);
    socket.on("data", data => {
      data = data.toString("utf8");
      resolve(data);
    });
    socket.on("error", err => {
      reject(err);
      logger.error(`Error Message: ${err}`);
    });
  });
};
const recResponse = socket => {
  return new Promise((resolve, reject) => {
    socket.on("data", data => {
      data = data.toString("utf8").split(" ")[2];
      let chunk = "";
      for (let i = 0; i < data.length; i++) {
        chunk += data[i];
      }
      logger.debug(chunk);
      resolve(chunk);
    });
    socket.on("error", err => {
      reject(err);
      logger.error(`Error Message: ${err}`);
    });
  });
};
module.exports = { sendQuery, recResponse };
