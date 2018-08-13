package com.scorelab.senz

import com.scorelab.senz.utils.MessageUtils

object Main extends App{
  println("Initalizing SenZ..")
  val query = "GET #pubkey @device2 #time time1 ^device1 Signature"
  val message = MessageUtils.parseMessage(query)
}
