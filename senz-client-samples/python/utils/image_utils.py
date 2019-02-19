import base64

# Convert image to string
def imageToString(fileName):
	with open(fileName, "rb") as imageFile:
		return base64.b64encode(imageFile.read())
		
# Convert string to image
def stringToImage(str, fileName):
	fh = open(fileName, "wb")
	fh.write(base64.b64decode(str.encode()))
	fh.close()

