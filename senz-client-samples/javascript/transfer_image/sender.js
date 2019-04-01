const AESUtil=require("../utils/aes_utils");
const imageUtil=require("../utils/image_utils");
const client=require("../client");
const express=require("express");
const app=express();
const port=process.env.port || 3001;
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
console.log("Registering Device");
var time=client.getTimestamp();
var regmsg=`SHARE #pubkey KEY @senz #time ${time} ^dev1 signature\n`;
const imagePathToSend="sample.jpg";
//Convert image to byte string
var byteString=imageUtil.imageToString(imagePathToSend);
//Encrypt using AES Crypto
var aes=new AESUtil.AESUtils(sharedKey);
var byteString=aes.encrypt(byteString);
//console.log(byteString);
//Send Message
var senmsg = `DATA $image ${byteString} @dev2 #time ${time} ^dev1 signature\n`
//sendImage(regmsg,senmsg);
var registeringDevice=function(regmsg)
{
    client.sendMessage(regmsg).then(function(registered){
        console.log(registered);
    })
}
var sendingMessage=function(senmsg){
    client.sendMessage(senmsg).then(function(senData){
        console.log(senData);
    })
}
// client.sendMessage(regmsg).then(function(registered){
//     console.log(registered);
//     client.sendMessage(senmsg).then(function(sentData){
//         console.log(sentData);
        
//     })
// });
app.get("/",function(req,res){
    res.sendFile("sendRegister.html",{root:__dirname});
})
app.get("/reg1",function(req,res){
    registeringDevice(regmsg);
    res.sendFile("sendSend.html",{root:__dirname})
})
app.get("/sen1",function(req,res){
    sendingMessage(senmsg);
    res.send("File Sent !!");
})
app.listen(port,function(err){
    if(err)
    throw err;
    console.log(`server running on port ${port}`);
})