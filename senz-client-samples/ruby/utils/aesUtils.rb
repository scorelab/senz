
require 'aes'


class AesUtil
  def initialize(key)
    @bs = 32
    @key = key
  end


  def encrypt(raw)
    key = @key
    cipher_base64 = AES.encrypt(raw, key)
    #puts cipher_base64
    return cipher_base64
  end

  def decode(enc)
    key = @key
    plain_text = AES.decrypt(enc, key)
    return plain_text
  end
end
