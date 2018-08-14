package com.scorelab.senz.socket

import akka.actor.{Actor, ActorLogging, ActorRef, Props}
import akka.io.Tcp
import akka.util.ByteString
import com.scorelab.senz.models.{Message, MessageType}
import com.scorelab.senz.models.MessageType._
import com.scorelab.senz.utils.MessageUtils


//Senz Socket handler
class SocketHandlerActor(device: ActorRef) extends Actor with ActorLogging {
  device ! Tcp.Register(self)

  def receive = {
    case Tcp.Received(data) =>
      print("RECEIVED: " + data.utf8String)
      val query: String = data.utf8String
      val message = MessageUtils.parseMessage(query)


      // Handle message
      if (message.messageType == MessageType.SHARE && message.attributes.contains("#pubkey")){
        onShare(message)
      } else if (message.messageType == MessageType.DATA){ // Send message
        onData(message, data)
      }

    case Tcp.PeerClosed =>
      log.info("Device disconnected")
      context stop self
  }

  def onShare(message: Message) = {
    if (message.attributes.contains("#pubkey")){
      val deviceName = message.sender

      if (SessionManager.contains(deviceName)){
        // Send error message
        val reply = MessageUtils.createQuery(DATA, Map("#msg" -> "ERR:DEVICE_ALREADY_EXISTS"), deviceName)
        device ! Tcp.Write(ByteString(reply))
      } else {
        // Add the device to the session
        SessionManager.login(deviceName, device); // Add to the session
        val reply = MessageUtils.createQuery(DATA, Map("#msg" -> "OK"), deviceName)
        device ! Tcp.Write(ByteString(reply))
        println("Device registered")
      }
    }
  }

  def onData(message: Message, data: ByteString) = {
    println("RECEIVED: Data Message")
    if (SessionManager.sessions.contains(message.receiver)){
      val receiverActor: ActorRef = SessionManager.getSession(message.receiver).value
      receiverActor ! Tcp.Write(data)
      device ! Tcp.Write(ByteString("Message is sent to the device " + message.receiver + "\n"))
    } else {
      device ! Tcp.Write(ByteString("Device is not logged in\n"))
    }
  }
}
