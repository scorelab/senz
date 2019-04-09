const net = require("net");
const logger = require('./utils/winstonConfig')
// Create a socket (client) that connects to the server
const socket = new net.Socket();
socket.connect(2552, "localhost", function () {
    logger.info("Client: Connected to server");
});

const sendMessage = function (msg) {
    return new Promise(function (resolve) {
        socket.write(msg);
        socket.on("data", function (data) {
            data = data.toString('utf8')
            resolve(data);


        })
        socket.on('error', function (e) {
            logger.error(`Error Message: ${e}`);
        })

    })

}
const getResponse = function () {
    return new Promise(function (resolve) {
        socket.on("data", function (data) {
            data = data.toString('utf8').split(" ")[2]
            let chunk = "";
            for (let i = 0; i < data.length; i++) {
                chunk += data[i];
            }
            logger.debug(chunk);
            resolve(chunk);
        })

    })
}

const receiveMessage = async function () {
    let data = await getResponse();
    return data;



}
const getTimestamp = function () {
    return Date.now();
}

module.exports = { sendMessage, receiveMessage, getTimestamp };
