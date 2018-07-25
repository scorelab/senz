import sys, os
sys.path.insert(0, os.path.abspath('..'))

from client import *
from utils.image_utils import *

# Register device
msg = "SHARE #pubkey KEY @senz #time {} ^dev1 signature".format(getTimestamp())
sendMessage(msg)

# Convert image to byte string
str = imageToString("sample.jpg")

# Send the message
msg = "DATA #image {} @dev2 #time {} ^dev1 signature\n".format(str, getTimestamp())
sendMessage(msg)


# stringToImage(imageToString("sumedhe.jpg"), "newimage.jpg")

