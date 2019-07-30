## Sample Code

### Sender

```javascript
const net = require("net");
const socket = new net.Socket();
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const senz = require("senz");
socket.connect(2552, "localhost", () => {
  console.log(`Connected to the server on port ${2552}`);
});
const deviceName = "<device-name>";
const shareQuery = `SHARE #pubkey <device-public-key> @senz #time ${Date.now()} ^${deviceName} <user-signature>`;
senz.query.sendQuery(socket, shareQuery).then(res => {
  console.log(res);
});
const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const ImgString = senz.imageUtil.imageToString("<image-path>");
const aes = new senz.aesUtil.AESUtils(sharedKey);
const encImg = aes.encrypt(ImgString);
const dataQuery = `DATA $image ${encImg} @dev2 #time ${Date.now()} ^<device-name> <user-signature>`;
rl.question(
  "Press enter to send data.\nMake sure your receiver is listening.\n",
  () => {
    senz.query.sendQuery(socket, dataQuery).then(res => {
      console.log(res);
      const unshareQuery = `UNSHARE #pubkey dev1pub @senz #time ${Date.now()} ^${deviceName} Mojo0124374ebd`;
      senz.query.sendQuery(socket, unshareQuery).then(res => {
        console.log(res);
        socket.destroy();
      });
    });

    rl.close();
  }
);
```

### Receiver

```javascript
const net = require("net");
const socket = new net.Socket();
const senz = require("senz");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

socket.connect(2552, "localhost", () => {
  console.log(`Connected to the server on port ${2552}`);
});

const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const aes = new senz.aesUtil.AESUtils(sharedKey);
const deviceName = "<device-name>";
const shareQuery = `SHARE #pubkey <device-public-key> @senz #time ${Date.now()} ^${deviceName} <user-signature>`;
senz.query.sendQuery(socket, shareQuery).then(res => {
  console.log(res);
});
rl.question("Press enter to start listening.\n", () => {
  console.log("Receiving the data");
  senz.query.recResponse(socket).then(res => {
    console.log(res);
    const decryptedImg = aes.decrypt(res);
    senz.imageUtil.stringToImage(decryptedImg, "<path-of-image>");
    const unshareQuery = `UNSHARE #pubkey dev1pub @senz #time ${Date.now()} ^${deviceName} Mojo0124374ebd`;
    senz.query.sendQuery(socket, unshareQuery).then(res => {
      console.log(res);
      socket.destroy();
    });
    rl.close();
  });
});
```
