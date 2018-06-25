package com.scorelab.senz.socket

import akka.actor.{Actor, ActorLogging, ActorRef}
import akka.io.Tcp

//Senz Socket handler
class SocketHandlerActor(device: ActorRef) extends Actor with ActorLogging {
  device ! Tcp.Register(self)

  def receive = {
    case Tcp.Received(data) =>
      print(data.utf8String)
   case Tcp.PeerClosed =>
      log.info("Device disconnected")
      context stop self
  }
}
