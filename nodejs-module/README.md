<p align="center">
<img src="https://raw.githubusercontent.com/YashMeh/AdminPanel/master/bottom_text.png" height=300 width=200  alt="senz logo" />
<p align="center">
A npm package to connect your devices to the senz switch for secure data transfer.
<p align="center">
<a href="https://www.npmjs.com/package/senz" >
<img src="https://img.shields.io/badge/npm-6.9.0-brightgreen" alt="npm 6.9.0" ></a> <img src="https://img.shields.io/badge/node-11.8.0-brightgreen" alt="node 11.8.0"> <a href="https://github.com/scorelab/senz/blob/master/LICENSE" alt="license"><img alt="GitHub" src="https://img.shields.io/github/license/scorelab/senz"></a><a href="https://gitter.im/scorelab/senz" alt="gitter"> <img alt="Gitter" src="https://img.shields.io/gitter/room/scorelab/senz"></a> <img alt="npm" src="https://img.shields.io/npm/dw/senz">
</p>
</p>
</p>

### Installation

```bash
npm install senz --save
```

### Importing

```javascript
const senz = require("senz");
```

#### Creating a socket

The following code is common in all the subsequent examples .

```javascript
const senz = require("senz");
const net = require("net");
//Creating a socket
const socket = new net.Socket();
//Connecting the socket to the port and host of the senz switch
socket.connect(2552, "localhost", () => {
  console.log(`Connected to the server on port ${2552}`);
});
```

#### query.sendQuery(socket,query)

This function takes in the socket and query as input and returns a promise.

```javascript
//Function to send the query to the switch and get the response
senz.query.sendQuery(socket, shareQuery).then(res => {
  console.log(res);
});
```

#### query.recResponse(socket)

This function takes a socket as an input and receives the response on it.

```javascript
//Function to receive the output from the server
senz.query.recResponse(socket).then(res => {
  console.log(res);
});
```

The module supports data encrytion and decryption methods out of the box.

#### Encryption

```javascript
//Key should be of 16 bytes
const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
//Create a new object of the AESUtils class
const aes = new senz.aesUtil.AESUtils(sharedKey);
const data = "hello";
const encryptedData = aes.encrypt(data);
```

#### Decryption

```javascript
const data = aes.decrypt(encryptedData);
```

### Image functions

If you want to send an image through the query then these functions will come handy for sure.

#### imageToString(path)

This function takes the path of the image as input and returns the base64 encoded string of the image.

```javascript
const ImgString = senz.imageUtil.imageToString("<image-path>");
```

#### stringToImage(base64 String,path)

This function takes the base64 encoded string and saves the image onto the path specified.

```javascript
senz.imageUtil.stringToImage(imgString, "<image-path>");
```
