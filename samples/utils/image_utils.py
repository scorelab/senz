import base64

def imageToString(fileName):
	with open(fileName, "rb") as imageFile:
		str = base64.b64encode(imageFile.read())
		#print str
		return str

def stringToImage(str, fileName):
	fh = open(fileName, "wb")
	fh.write(str.decode('base64'))
	fh.close()

