const fs = require("fs");

const imageToString = function(filename) {
  // read binary data
  const binaryImg = fs.readFileSync(filename);
  // convert binary data to base64 encoded string
  return new Buffer(binaryImg).toString("base64");
};
const stringToImage = function(str, filename) {
  //Decoding the base64 string and writing the file
  //const buf = Buffer.from(str,'base64');
  fs.writeFile(filename, str, "base64", function(err) {
    if (err) throw err;
  });
};
module.exports = { imageToString, stringToImage };
