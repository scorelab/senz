package com.scorelab.senz.socket

import akka.actor.{Actor, ActorLogging, ActorRef, Props}
import akka.io.Tcp
import akka.util.ByteString
import com.scorelab.senz.models.MessageType
import com.scorelab.senz.utils.MessageUtils

//Senz Socket handler
class SocketHandlerActor(device: ActorRef) extends Actor with ActorLogging {
  device ! Tcp.Register(self)

  def receive = {
    case Tcp.Received(data) =>
      print(data.utf8String)
      val query: String = data.utf8String
      val message = MessageUtils.parseMessage(query)

      // Login device
      if (message.messageType == MessageType.SHARE && query.contains("pubkey")){ // TODO: Check pubkey from the atttributes
        SessionManager.login(message.sender, device); // Add to the session
        device ! Tcp.Write(ByteString("Device registered\n"))
        println(device)
      } else if (message.messageType == MessageType.DATA){ // Send message
        if (SessionManager.sessions.contains(message.receiver)){
          val receiverActor: ActorRef = SessionManager.getSession(message.receiver).value
          receiverActor ! Tcp.Write(ByteString("Message Received from " + message.sender + ": " + data.utf8String))
          device ! Tcp.Write(ByteString("Message is sent to the device " + message.receiver + "\n"))
        } else {
          device ! Tcp.Write(ByteString("Device is not logged in\n"))
        }
      }

   case Tcp.PeerClosed =>
      log.info("Device disconnected")
      context stop self
  }
}
