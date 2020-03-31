const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3001;
const {registerReceiver} = require("./receiverController.js");


io.on("connection", socket=>{
  console.log("receiver server connected");
  socket.on("receive data",async msg => {
    registerReceiver(msg).then(data =>{
      io.emit('receive data', data);
    })
  });
});

server.listen(port,
  function(){console.log("receiver server running on port "+ port)});