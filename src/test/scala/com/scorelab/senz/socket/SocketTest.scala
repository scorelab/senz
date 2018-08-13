package com.scorelab.senz.socket

import akka.actor.{ActorSystem, Props}
import org.scalatest.FunSuite

//Test the SenzSocket
class SocketTest extends FunSuite {
  test("testSenzSocket") {
    val system = ActorSystem("system")
    val server = system.actorOf(Props[SocketListenerActor], name = "server")

    // Keep the socket alive
    Thread.sleep(5000000)
  }
}
