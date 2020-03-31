const net = require("net");
const socket = new net.Socket();
const AESUtils = require("./AESutils");
const logger = require('./winstonConfig')
const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const aes = new AESUtils(sharedKey);  


socket.connect(2552, "localhost", () => {
  console.log(`Receiver Connected to the server on port ${2552}`);
});
const time = Date.now();

const sendMessage = function(msg) {
  return new Promise(function(resolve) {
    socket.write(msg);
    socket.on("data", function(data) {
      data = data.toString("utf8");
      resolve(data);
    });
    socket.on("error", function(e) {
      console.log(`Error Message: ${e}`);
    });
  });
};

const getResponse = function () {
  return new Promise(function (resolve) {
    socket.on("data", function (data) {
      data = data.toString("utf8").split(" ")[2];
      let chunk = "";
      for (let i = 0; i < data.length; i++) {
        chunk += data[i];
      }
      resolve(chunk);
    });
  });
};

const receiveMessage = async function () {
  let data = await getResponse();
  return data;
};

const receiveImage = function (messagedata) {
  const { signature, receiverPublicKey, receiverDeviceId } = messagedata;
  const data = receiveMessage().then(function (encImg) {
    const decrptedBase64 = aes.decrypt(encImg);
    sendMessage(`UNSHARE #pubkey ${receiverPublicKey} @senz #time ${time} ^${receiverDeviceId} ${signature}`).then(function () {
      console.log("receiver unRegistered")
    });
    return decrptedBase64;
  });
  return  data;
};

const registerReceiver = function(messagedata) {
  const { signature, receiverPublicKey, receiverDeviceId } = messagedata;
  var shareQuery = `SHARE #pubkey ${receiverPublicKey} @senz #time ${time} ^${receiverDeviceId} ${signature}`;
  return sendMessage(shareQuery).then(function(shareQuery) {
      console.log("Ready to receive message ");
      return receiveImage(messagedata).then(data => data).catch(err=> {throw err;})
  });
};
module.exports = {registerReceiver};