#!/usr/bin/env python3

import socket, sys, time

host, port = 'localhost', 2552

# Create an ipv4 socket
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the client
client.connect((host, port))

# Send message to server
def sendMessage(message):
    # Send message
    client.send(message)
    # Receive and print the respond
    res = receiveMessage()
    print("[Server] {}\n".format(res))

def receiveMessage():
    response = client.recv(5000000)
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
	        print(commands)

	# send commands of file
	for line in commands:
	    sendMessage(line)


	# send some data (in this case a HTTP GET request)
	while True:
	    msg = raw_input()
	    sendMessage(msg)
