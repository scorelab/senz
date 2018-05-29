package com.scorelab.senz.socket

import java.net.InetSocketAddress

import akka.actor.{Actor, ActorLogging, ActorRef, Props}
import akka.io.Tcp
import akka.util.ByteString

// Senz Handler
object SenzHandler {
  final case class Ack(offset: Int) extends Tcp.Event

  def props(connection: ActorRef, remote: InetSocketAddress): Props =
    Props(classOf[SenzHandlerActor], connection, remote)
}

// Senz Handler Actor
class SenzHandlerActor(connection: ActorRef, remote: InetSocketAddress) extends Actor with ActorLogging {

  import Tcp._

  // terminate when connection breaks
  context watch connection

  case object Ack extends Event

  def receive = {
    case Received(data) ⇒
      buffer(data)
      connection ! Write(data, Ack)

      context.become({
        case Received(data) ⇒ buffer(data)
        case Ack            ⇒ acknowledge()
        case PeerClosed     ⇒ closing = true
      }, discardOld = false)

    case PeerClosed ⇒ context stop self
  }

  override def postStop(): Unit = {
    log.info(s"transferred $transferred bytes from/to [$remote]")
  }

  // storage
  var storage = Vector.empty[ByteString]
  var stored = 0L
  var transferred = 0L
  var closing = false

  val maxStored = 100000000L
  val highWatermark = maxStored * 5 / 10
  val lowWatermark = maxStored * 3 / 10
  var suspended = false

  // buffer
  private def buffer(data: ByteString): Unit = {
    storage :+= data
    stored += data.size

    if (stored > maxStored) {
      log.warning(s"drop connection to [$remote] (buffer overrun)")
      context stop self

    } else if (stored > highWatermark) {
      log.debug(s"suspending reading")
      connection ! SuspendReading
      suspended = true
    }
  }

  private def acknowledge(): Unit = {
    require(storage.nonEmpty, "Storage was empty")

    val size = storage(0).size
    stored -= size
    transferred += size

    storage = storage drop 1

    if (suspended && stored < lowWatermark) {
      // resume reading
      connection ! ResumeReading
      suspended = false
    }

    if (storage.isEmpty) {
      if (closing) context stop self
      else context.unbecome()
    } else connection ! Write(storage(0), Ack)
  }
}