package com.scorelab.senz.socket

import java.net.InetSocketAddress

import akka.actor.{Actor, ActorLogging, ActorRef, ActorSystem, Props}
import akka.io.{IO, Tcp}

class SenzSocketActor extends Actor with ActorLogging {
  import context.system

  IO(Tcp) ! Tcp.Bind(self, new InetSocketAddress("localhost", 2552))

  def receive = {
    case Tcp.Bound(localAddress) => log.info("Server started")

    case Tcp.CommandFailed(_: Tcp.Bind) => context stop self

    case Tcp.Connected(remote, local) =>
      log.info("New device connected")
      val device = sender()
      val handler = context.actorOf(Props(classOf[SenzSocketHandlerActor]), name = "senzhandler")

  }
}

class SenzSocketHandlerActor extends Actor with ActorLogging {
  def receive = {
    case Tcp.Received(data) =>
      print(data.utf8String)
    case Tcp.PeerClosed =>
      log.info("Device disconnected")
      context stop self
  }
}