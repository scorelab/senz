package com.scorelab.senz

import akka.actor.{ActorSystem, Props}
import com.scorelab.senz.socket.SocketListenerActor
import com.scorelab.senz.utils.MessageUtils

object Main extends App{
  println("Initalizing SenZ..")

  // Run server
  val system = ActorSystem("system")
  val server = system.actorOf(Props[SocketListenerActor], name = "server")
}
