const AESUtil=require("../utils/aes_utils");
const imageUtil=require("../utils/image_utils");
const client=require("../client");
const express=require("express");
const app=express();
const port=process.env.port || 3000;
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
var time=client.getTimestamp();
var regmsg=`SHARE #pubkey KEY @senz #time ${time} ^dev2 signature\n`;
const imagePathToSave="received.jpg";
var aes=new AESUtil.AESUtils(sharedKey);  
var registerDevice=function(mssg){
    console.log("Registering Device");
    client.sendMessage(regmsg).then(function(retMsg){
        console.log("<><><><><><><><><><><><><><<><>");
        console.log(retMsg);
        console.log("Ready to receive message ");
    
    })    
}
var receiveImage=function(){
    client.receiveMessage().then(function(encImg){
    var decrptedBase64=aes.decrypt(encImg);
    imageUtil.stringToImage(decrptedBase64,imagePathToSave);
    console.log("CHECK YOUR DIRECTORY");
    })
}
app.get("/",function(req,res){
    res.sendFile("receiveRegister.html",{root:__dirname})
})      
app.get("/reg2",function(req,res){
    registerDevice();
    res.sendFile("receiveAccept.html",{root:__dirname})
})
app.get("/rec2",function(req,res){
    receiveImage();
    res.send("Check your directory !!");
})
app.listen(port,function(err){
    if(err)
    throw err;
    else
    console.log("App running on port "+port);
})
