import sys, os
sys.path.insert(0, os.path.abspath('..'))

from client import *
from utils.image_utils import *
from utils.aes_utils import *

sharedKey = "LGWlhb329Y09oluI"
imagePathToStore = "received.jpg"

# Register device
print "Registering..."
msg = "SHARE #pubkey KEY @senz #time {} ^dev2 signature".format(getTimestamp())
sendMessage(msg)

# Receive message
print "Ready to receive image"
reply = receiveMessage()
print reply
byteString = reply.split()[2]

# Decode using AES Crypto
aes = AESUtils(sharedKey)
byteString = aes.decrypt(byteString)

# Save image
stringToImage(byteString, imagePathToStore)
print "Image saved [{}]".format(imagePathToStore)
