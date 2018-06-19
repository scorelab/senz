package com.scorelab.senz.socket

import akka.actor.{ActorSystem, Props}
import org.scalatest.FunSuite

//Test the SenzSocket
class SenzSocketActorTest extends FunSuite {
  test("testSenzSocket") {
    val system = ActorSystem("system")
    val server = system.actorOf(Props[SenzSocketActor], name = "server")

    // Keep the socket alive
    Thread.sleep(100000)
  }
}
