package com.scorelab.senz.utils

import java.security.KeyPair

import org.scalatest.FunSuite

class RSAUtilsTest extends FunSuite {

  test("Test KeyPair Generation") {
    val keyPair: KeyPair = RSAUtils.generateKeyPair(1024)
    val privateKey: String = RSAUtils.privateKeyToString(keyPair.getPrivate)
    val publicKey: String = RSAUtils.publicKeyToString(keyPair.getPublic)
    println(s"Private Key: $privateKey")
    println(s"Public Key: $publicKey")
  }

}
