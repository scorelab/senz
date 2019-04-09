const AESUtil=require("../utils/aes_utils");
const imageUtil=require("../utils/image_utils");
const logger = require("../utils/winstonConfig");
const client=require("../client");
const express=require("express");
const app=express();
const port=process.env.port || 3001;
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
logger.info("Registering Device");
var time=client.getTimestamp();
var regmsg=`SHARE #pubkey KEY @senz #time ${time} ^dev1 signature\n`;
const imagePathToSend="sample.jpg";
//Convert image to byte string
var byteString=imageUtil.imageToString(imagePathToSend);
//Encrypt using AES Crypto
var aes=new AESUtil.AESUtils(sharedKey);
var byteString=aes.encrypt(byteString);
//logger.info(byteString);
//Send Message
var senmsg = `DATA $image ${byteString} @dev2 #time ${time} ^dev1 signature\n`
//sendImage(regmsg,senmsg);
var registeringDevice=function(regmsg)
{
    client.sendMessage(regmsg).then(function(registered){
        logger.info(registered);
    })
}
var sendingMessage=function(senmsg){
    client.sendMessage(senmsg).then(function(senData){
        logger.info(senData);
        client.sendMessage(`UNSHARE #pubkey KEY @senz #time ${time} ^dev1 signature\n`).then(function(registered){
            logger.info(registered);
        })
    })
}

// client.sendMessage(regmsg).then(function(registered){
//     logger.info(registered);
//     client.sendMessage(senmsg).then(function(sentData){
//         logger.info(sentData);
        
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
    logger.info(`server running on port ${port}`);
})
