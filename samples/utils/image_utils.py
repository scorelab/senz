import base64

# Convert image to string
def imageToString(fileName):
	with open(fileName, "rb") as imageFile:
		str = base64.b64encode(imageFile.read())
		#print str
		return str

# Convert string to image
def stringToImage(str, fileName):
	fh = open(fileName, "wb")
	fh.write(str.decode('base64'))
	fh.close()

