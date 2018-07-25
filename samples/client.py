import socket, sys, time

host, port = 'localhost', 2552

# create an ipv4 (AF_INET) socket object using the tcp protocol (SOCK_STREAM)
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# client.settimeout(2)

# connect the client
client.connect((host, port))

# Send message to server
def sendMessage(message):
    # Send message
    client.send(message)
    # Receive and print the respond
    print(receiveMessage())

def receiveMessage():
    response = client.recv(1000000)
    return response

def getTimestamp():
    return time.strftime("%Y%m%d%H%M%S", time.localtime())

if __name__ == "__main__":


	# Load file if provided
	commands = []
	if len(sys.argv) > 1:
	    filename = sys.argv[1]
	    with open (filename, "r") as myfile:
	        commands=myfile.read().split('\n')
	        print commands

	# send commands of file
	for line in commands:
	    sendMessage(line)


	# send some data (in this case a HTTP GET request)
	while True:
	    msg = raw_input()
	    sendMessage(msg)
