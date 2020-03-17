# Sample Client For Senz : Transfer Image (Ruby)

It is a sample client example in Ruby. Here Sender sends an image to the Receiver via senz server.

## Installing Gems

cd into project directory 'ruby'
Install required rubygems by following command
```bash
bundle install
```

### Pre running Steps
1. Setup and run [senz-switch](../../senz-switch/README.md).
2. Now setup and Run senz-web client both [frontend](../../senz-web/frontend/README.md) and [backend](../../senz-web/backend/README.md).
3. Now click on your profile icon and then click on My signature to get your signature.
4. In order to communicate between 2 devices you need to add both the devices in the same project. So if not added then add 2 devices in any of your projects.
5. Now in [reciever.rb](./receiver.rb) and [sender.rb](./sender.rb) file replace the signature and pubkey with your signature and pubkey respectively. Also make sure that sender and reciever pubkeys are different.

# Instructions

1. Now cd into project directory 'ruby'
```bash
cd ruby
```
2. Run Receiver Device
```bash
ruby receiver.rb
```

3. Run Sender Device
```bash
ruby sender.rb
```
