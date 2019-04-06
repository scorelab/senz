#!/usr/bin/env python3

import sys, os
sys.path.insert(0, os.path.abspath('..'))

from senz.client import *
from utils.image_utils import *
from utils.aes_utils import *

deviceName = "dev1"
sharedKey = "LGWlhb329Y09oluI"
imagePathToSend = "sample.jpg"

# Register device
print("Registering device...")
msg = "SHARE #pubkey KEY @senz #time {} ^{} signature".format(getTimestamp(), deviceName)
sendMessage(msg)

# Convert image to byte string
byteString = imageToString(imagePathToSend).decode()

# Encrypt using AES Crypto
aes = AESUtils(sharedKey)
byteString = aes.encrypt(byteString)

# Send the message
print("Press enter to send the image...")
input()

msg = "DATA $image {} @dev2 #time {} ^dev1 signature\n".format(byteString, getTimestamp())
sendMessage(msg)

