const net = require("net");
// Create a socket (client) that connects to the server
var socket = new net.Socket();
socket.connect(2552, "localhost", function () {
    console.log("Client: Connected to server");
});

var sendMessage=function(msg){
    return new Promise(function(resolve,reject){
        socket.write(msg);
        socket.on("data",function(data){
        data=data.toString('utf8')
        resolve(data);


    })
      socket.on('error', function(e){
        console.log("Error Message:",e);
   })

    })

}
var getResponse=function(){
    return new Promise(function(resolve,reject){
            socket.on("data",function(data){
                data=data.toString('utf8').split(" ")[2]
                var chunk="";
                for(var i=0;i<data.length;i++){
                    chunk+=data[i];
                }
                console.log(chunk);
                resolve(chunk);
            })

        })
    }

var receiveMessage=async function(){
        let data=await getResponse();
        return data;



}
var getTimestamp=function(){
    return Date.now();
}

module.exports={sendMessage,receiveMessage,getTimestamp};
