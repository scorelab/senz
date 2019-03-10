package com.scorelab.senz.socket

import java.net.InetSocketAddress
import context.system

import akka.actor._
import akka.io.{IO, Tcp}
import com.scorelab.senz.config.AppConfig

//Senz Socket
class SocketListenerActor extends Actor with ActorLogging {

  val hostname : String = AppConfig().getString("app.socket.hostname")
  val port : Int = AppConfig().getInt("app.socket.port")
  IO(Tcp) ! Tcp.Bind(self, new InetSocketAddress(hostname, port))

  def receive = {
    case Tcp.Bound(localAddress) => log.info(s"Server is running at $hostname $port")

    case Tcp.CommandFailed(_: Tcp.Bind) => context stop self

    case Tcp.Connected(remote, local) =>
      val device = sender()
      val handler = context.actorOf(Props(classOf[SocketHandlerActor], device))
      log.info("New device connected")

  }
}

