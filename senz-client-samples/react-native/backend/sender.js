const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3003;
const {registeringSender} = require("./senderController");



io.on("connection", socket=>{
  console.log("sender server connected");
  socket.on("send data",  msg => {
    registeringSender(msg);
  });
});

server.listen(port, 
  function(){console.log("sender server running on port "+ port)});