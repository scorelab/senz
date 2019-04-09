process.env.NODE_ENV = 'test';

const chai = require('chai');
const AESUtil = require('../utils/aes_utils.js');
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

const expect = chai.expect;

describe('testing aes utils', ( )=> {
  it('should encrypt and decrypt correctly', () => {
    let aes = new AESUtil.AESUtils(sharedKey);
    let text = 'foo-foo-foo-foo';
    let encrypted = aes.encrypt(text);
    let decrypted = aes.decrypt(encrypted);

    expect(decrypted).to.equal(text);
  });
})
