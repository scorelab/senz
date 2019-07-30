const aesjs = require("aes-js");
const base64js = require("base64-js");
const ab2str = require("arraybuffer-to-string");

class AESUtils {
  constructor(key) {
    this.bs = 32;
    this.key = key;
  }
  encrypt(raw) {
    //Message should be a multiple of 16 bytes
    raw = this.pad(raw);
    // The initialization vector (must be 16 bytes)
    const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    //Convert text to bytes
    const textBytes = aesjs.utils.utf8.toBytes(raw);
    const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, iv);
    //Encrypt the message
    const encryptedBytes = aesCbc.encrypt(textBytes);
    const encryptedBytesBase64 = base64js.fromByteArray(encryptedBytes);
    return encryptedBytesBase64;
  }
  decrypt(enc) {
    const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const encryptedBytes = base64js.toByteArray(enc);
    const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, iv);
    //Get the decrypted bytes
    const decryptedBytes = aesCbc.decrypt(encryptedBytes);
    //Convert the decrypted bytes to text
    const uint8 = new Uint8Array(decryptedBytes);
    const decryptedText = ab2str(uint8);
    return this.unpad(decryptedText);
  }
  ord(str) {
    return str.charCodeAt(0);
  }

  pad(s) {
    let fins = "";
    const num = this.bs - (s.length % this.bs);
    for (let i = 0; i < num; i++) {
      fins = fins + String.fromCharCode(this.bs - (s.length % this.bs));
    }
    return s + fins;
  }
  unpad(s) {
    return s.substr(0, s.length - this.ord(s.substr(s.length - 1)));
  }
}
module.exports = { AESUtils };
