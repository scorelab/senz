require  "socket"

$socket = TCPSocket.new("localhost", 2552)

def sendMessage(message)
  $socket.write(message)
  puts receiveMessage
end

def receiveMessage
  res = $socket.recv(5000000)
  return res
end

def timeStamp
  time = Time.new
  return time.inspect
end
