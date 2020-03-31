# Sample Client: Transfer Image (Java)

### Pre running Steps
1. Setup and run [senz-switch](../../senz-switch/README.md).
2. Now setup and Run senz-web client both [frontend](../../senz-web/frontend/README.md) and [backend](../../senz-web/backend/README.md).
3. Now click on your profile icon and then click on My signature to get your signature.
4. In order to communicate between 2 devices you need to add both the devices in the same project. So if not added then add 2 devices in any of your projects.
5. Now in [Reciever.java](./Receiver.java) and [Sender.java](./Sender.java) file replace the signature and pubkey with your signature and pubkey respectively. Also make sure that sender and reciever pubkeys are different.

## Instructions

1. Now cd into project directory 'ruby'
```bash
cd ruby
```
2. Compile and run receiver device
```bash
javac Receiver.java
java Receiver
```
2. Compile and run sender device
```bash
javac Sender.java
java Sender
```
