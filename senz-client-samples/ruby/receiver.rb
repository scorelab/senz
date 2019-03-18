require_relative 'utils/AesUtils'
require_relative 'utils/imageUtils'
require_relative 'client'

sharedKey  = "LGWlhb329Y09oluI"
imagePathToReceive = "received.jpg"

#registering the device
puts "registering the device.."
timeS = timeStamp()
regmsg = "SHARE #pubkey KEY @senz #time %s ^dev2 signature" % [timeS]
sendMessage(regmsg)

#receiving a Message
puts "receiving a message"
msg = receiveMessage
arr = msg.split(" ")
byteString = arr[2..-8]
byteString = byteString.join(" ")
puts "image received"
puts byteString


#decoding a message
aes = AesUtil.new(sharedKey)
decryptedByteString = aes.decode(byteString)
#puts decryptedByteString

#saving image
stringToImage(decryptedByteString, imagePathToReceive)
puts "check your directory"
