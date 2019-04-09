#!/usr/bin/env python3

import sys, os
sys.path.insert(0, os.path.abspath('..'))

from senz.client import *
from utils.image_utils import *
from utils.aes_utils import *

deviceName = "dev2"
sharedKey = "LGWlhb329Y09oluI"
imagePathToStore = "received.jpg"

# Register device
print("Registering...")
msg = "SHARE #pubkey KEY @senz #time {} ^{} signature".format(getTimestamp(), deviceName)
sendMessage(msg)

# Receive message
print("Ready to receive image")
reply = receiveMessage()
byteString = reply.split(" ")[2]
res=""
for i in byteString:
    res+=i
print("Image received..")

# Decode using AES Crypto
aes = AESUtils(sharedKey)
byteString = aes.decrypt(res)

# Save image
stringToImage(byteString, imagePathToStore)
print("Image saved ({})".format(imagePathToStore))

# Unregister device
print("Unregistering...")
msg = "UNSHARE #pubkey KEY @senz #time {} ^{} signature".format(getTimestamp(), deviceName)
sendMessage(msg)
