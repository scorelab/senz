package com.scorelab.senz.utils

import java.security.{KeyPair, PrivateKey, PublicKey}

object RSAUtils {
  /** Generate a RSA KeyPair
    *
    * @param size
    * @return
    */
  def generateKeyPair(size: Int = 1024): KeyPair = {
    val keyPairGenerator = java.security.KeyPairGenerator.getInstance("RSA")
    keyPairGenerator.initialize(1024)
    keyPairGenerator.generateKeyPair
  }

  /** Convert privateKey to string
    *
    * @param bytes
    * @return
    */
  def publicKeyToString(publicKey: PublicKey): String = {
    bytesToString(publicKey.getEncoded)
  }

  /** Convert private key to string
    *
    * @param privateKey
    * @return
    */
  def privateKeyToString(privateKey: PrivateKey): String = {
    bytesToString(privateKey.getEncoded)
  }

  /** Convert byte array to string
    *
    * @param bytes
    * @return
    */
  def bytesToString(bytes: Array[Byte]): String = {
    javax.xml.bind.DatatypeConverter.printBase64Binary(bytes)
  }


}
