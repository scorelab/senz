const AESUtil=require("../utils/aes_utils");
const imageUtil=require("../utils/image_utils");
const logger=require("../utils/winstonConfig");
const client=require("../client");
const express=require("express");
const app=express();
const port=process.env.port || 3000;
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
const time=client.getTimestamp();
const regmsg=`SHARE #pubkey KEY @senz #time ${time} ^dev2 signature`;
const imagePathToSave="received.jpg";
const aes=new AESUtil.AESUtils(sharedKey);  
const registerDevice=function(){
    logger.info("Registering Device");
    client.sendMessage(regmsg).then(function(retMsg){
        logger.info("<><><><><><><><><><><><><><<><>");
        logger.info(retMsg);
        logger.info("Ready to receive message ");
    
    })    
}
const receiveImage=function(){
    client.receiveMessage().then(function(encImg){
    const decrptedBase64=aes.decrypt(encImg);
    imageUtil.stringToImage(decrptedBase64,imagePathToSave);
    client.sendMessage("").then(function() {
        logger.info(`UNSHARE #pubkey KEY @senz #time ${time} ^dev2 signature`);
        logger.info("Unregistering the device");

    })
    logger.info("CHECK YOUR DIRECTORY");
    })
}
app.get("/", function(req, res) {
    res.sendFile("receiveRegister.html", {
        root: __dirname
    })
})
app.get("/reg2", function(req, res) {
    registerDevice();
    res.sendFile("receiveAccept.html", {
        root: __dirname
    })
})
app.get("/rec2", function(req, res) {
    receiveImage();
    res.send("Check your directory !!");
})
app.listen(port, function(err) {
    if (err)
        throw err;
    else
    logger.info("App running on port "+port);
})
