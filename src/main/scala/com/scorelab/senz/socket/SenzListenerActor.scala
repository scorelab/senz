package com.scorelab.senz.socket

import java.net.InetSocketAddress

import akka.actor.ActorDSL.inbox
import akka.actor.{Actor, ActorLogging, ActorSystem, Props, SupervisorStrategy, _}
import akka.io.{IO, Tcp}

import scala.concurrent.duration.DurationInt

object SenzListener {
  val PORT = 2552

  implicit val system = ActorSystem("SenzSocket")

  // Start listener
  def start(): Unit = {
    val listener = inbox()
    listener.watch(system.actorOf(Props(classOf[SenzListenerActor], classOf[SenzHandlerActor]), "SenzSocket"))
    listener.receive(10.minutes)
  }

  // Terminate actor system
  def terminate(): Unit = {
    system.terminate()
  }
}

class SenzListenerActor(handlerClass: Class[_]) extends Actor with ActorLogging {

  import Tcp._
  import context.system

  val socketHost = "localhost"
  val socketPort = 2552

  // there is not recovery for broken connections
  override val supervisorStrategy = SupervisorStrategy.stoppingStrategy

  // bind to the listen port
  override def preStart(): Unit = {
    IO(Tcp) ! Bind(self, new InetSocketAddress(socketHost, socketPort))
  }

  def receive = {
    case Bound(localAddress) ⇒
      log.info("listening on port {}", localAddress.getPort)

    case CommandFailed(Bind(_, local, _, _, _)) ⇒
      log.warning(s"cannot bind to [$local]")
      context stop self

    case Connected(remote, local) ⇒
      log.info("received connection from {}", remote)
      val handler = context.actorOf(Props(handlerClass, sender(), remote))
      sender() ! Register(handler, keepOpenOnPeerClosed = true)
  }

  // stop restarting
  override def postRestart(thr: Throwable): Unit = context stop self
}