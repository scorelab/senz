package com.scorelab.senz.utils

import com.scorelab.senz.models.MessageType
import org.scalatest.FunSuite

class MessageUtilsTest extends FunSuite {
  test("testMessageUtils"){
    val query = "GET #pubkey @device2 #time time1 ^device1 Signature"
    val message = MessageUtils.parseMessage(query)

    // Test GET message
    assert(message.messageType === MessageType.GET)
    assert(message.attributes === Map("pubkey" -> "", "time" -> "t1"))
    assert(message.receiver === "device2")
    assert(message.sender === "device1")
    assert(message.signature === Some("Signature"))

  }
}
