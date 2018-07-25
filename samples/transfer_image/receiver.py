import sys, os
sys.path.insert(0, os.path.abspath('..'))

from client import *
from utils.image_utils import *


# Register device
msg = "SHARE #pubkey KEY @senz #time {} ^dev2 signature".format(getTimestamp())
sendMessage(msg)

# Receive message
reply = receiveMessage()
print reply

# Save image
stringToImage(reply.split()[2], "received.jpg")
