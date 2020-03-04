package com.scorelab.senz.utils

import com.scorelab.senz.models.MessageType
import org.scalatest.FunSuite

class MessageUtilsTest extends FunSuite {
  test("testMessageUtils: GET"){
    val query = "GET #pubkey @device2 #time time1 ^device1 Signature"
    val message = MessageUtils.parseMessage(query)

    // Test GET message
    assert(message.messageType === MessageType.GET)
    assert(message.attributes === Map("#pubkey" -> "", "#time" -> "time1"))
    assert(message.receiver === "device2")
    assert(message.sender === "device1")
    assert(message.signature === Some("Signature"))
  }

  test ("testMessageUtils: SHARE") {
    val query = "SHARE #pubkey pk @device2 #time time1 ^device1 Signature"
    val message = MessageUtils.parseMessage(query)

    // Test GET message
    assert(message.messageType === MessageType.SHARE)
    assert(message.attributes === Map("#pubkey" -> "pk", "#time" -> "time1"))
    assert(message.receiver === "device2")
    assert(message.sender === "device1")
    assert(message.signature === Some("Signature"))
  }

  test ("testMessageUtils: DATA") {
    val query = "DATA #msg Hello @device2 #time time1 ^device1 Signature"
    val message = MessageUtils.parseMessage(query)

    // Test GET message
    assert(message.messageType === MessageType.DATA)
    assert(message.attributes === Map("#msg" -> "Hello", "#time" -> "time1"))
    assert(message.receiver === "device2")
    assert(message.sender === "device1")
    assert(message.signature === Some("Signature"))
  }
}
