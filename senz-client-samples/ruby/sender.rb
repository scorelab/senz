require_relative 'utils/AesUtils'
require_relative 'utils/imageUtils'
require_relative 'client'

sharedKey  = "LGWlhb329Y09oluI"
imagePathToSend = "sample.jpg"

#to register device
puts "registering a device"
timeS = timeStamp()
regmsg = "SHARE #pubkey KEY @senz #time %s ^dev1 signature" % [timeS]
sendMessage(regmsg)

#convert image to byte string
byteString = imageToString(imagePathToSend)

#encrypting byte string using AES
aes = AesUtil.new(sharedKey)
byteString =  aes.encrypt(byteString)

#sending Message
timeS = timeStamp()
msg = "DATA $image %s @dev2 #time %s ^dev1 signature" % [byteString,timeS]
puts "do you want to send message(y/n)"
ans = gets.chomp
if(ans == 'y')
  puts "sending message"
  sendMessage(msg)
end
