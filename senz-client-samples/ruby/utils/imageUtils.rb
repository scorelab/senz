require "base64"
#filename = "sample.jpg"

def imageToString(filename)
  encodedImage = Base64.encode64(File.open(filename,"rb").read)
  return encodedImage
end

def stringToImage(str , filename)
  #saving image
  File.open(filename,"wb") do |file|
    file.write(Base64.decode64(str))
  end
end
