process.env.NODE_ENV = "test";

const chai = require("chai");
const AESUtil = require("../utils/aes_utils.js");
const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const expect = chai.expect;

describe("Encryption and decryption function", () => {
  it("should encrypt and decrypt correctly", () => {
    const aes = new AESUtil.AESUtils(sharedKey);
    const text = "foo-foo-foo-foo";
    const encrypted = aes.encrypt(text);
    const decrypted = aes.decrypt(encrypted);

    expect(decrypted).to.equal(text);
  });
});
