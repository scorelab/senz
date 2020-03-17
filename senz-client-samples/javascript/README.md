# Sample Client : Transfer Image (javascript)

## Instructions

### Pre-requisites

-   node
-   npm

### Pre running Steps
1. Setup and run [senz-switch](../../senz-switch/README.md).
2. Now setup and Run senz-web client both [frontend](../../senz-web/frontend/README.md) and [backend](../../senz-web/backend/README.md).
3. Now click on your profile icon and then click on My signature to get your signature.
4. In order to communicate between 2 devices you need to add both the devices in the same project. So if not added then add 2 devices in any of your projects.
5. Now go to transfer_image folder and in [reciever.js](./transfer_image/receiver.js) and [sender.js](./transfer_image/sender.js) file replace the signature and pubkey with your signature and pubkey respectively. Also make sure that sender and reciever pubkeys are different.

### Steps

```sh
cd samples/javascript
npm install
cd transfer_image
node sender.js
node receiver.js
```
### Steps to run eslint

cd into the javascript folder in the senz-client-samples folder

` cd senz-client-samples/javascript `

then run the eslint from the terminal as shown

` npm run lint ./file_name --fix `

for example if you want to run eslint in the transfer_image folder

` npm run lint ./transfer_image --fix `