package com.scorelab.senz.socket

import akka.actor.{Actor, ActorLogging, ActorRef, Props}
import akka.io.Tcp
import akka.util.ByteString
import com.scorelab.senz.models.{Message, MessageType}
import com.scorelab.senz.models.MessageType._
import com.scorelab.senz.utils.MessageUtils
import java.util.Calendar
import com.scorelab.senz.database.MongoFactory.logCollection
import com.mongodb.casbah.Imports._
import com.scorelab.senz.utils.ErrorHandling._
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
        val statusCode=registerHandler(query)
        if(statusCode==500){
        //Register device with the switch
        onShare(message,query)
        }
        else{
          //Send error message
          val reply = MessageUtils.createQuery(DATA, Map("#msg" -> errorMapper(statusCode)), message.sender)
          device ! Tcp.Write(ByteString(reply))
        }
      } else if (message.messageType == MessageType.DATA){ 
        val statusCode=shareHandler(query)
        //Log the query
        val log=MongoDBObject("sender"->keyNameMapper(message.sender),
                              "receiver"->keyNameMapper(message.receiver),
                              "signature"->message.signature,
                              "statusCode"->statusCode,
                              "timestamp"->Calendar.getInstance.getTime())
        logCollection.insert(log)    
        if(statusCode==500){                  
        //Send message  
        onData(message, data)
        }else{
         val reply = MessageUtils.createQuery(DATA, Map("#msg" -> errorMapper(statusCode)), message.sender)
         device ! Tcp.Write(ByteString(reply))
        }       
      }else if (message.messageType == MessageType.UNSHARE && message.attributes.contains("#pubkey")){
        onUnshare(message)
      }

    case Tcp.PeerClosed =>
      log.info("Device disconnected")
      context stop self
  }

  def onShare(message: Message,query:String) = {
    if (message.attributes.contains("#pubkey")){
      val deviceName = message.sender
      val publicKey=query.split(" ")(2)
      keyNameMapper+=(deviceName->publicKey)
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
  def onUnshare(message: Message) = {
    if (message.attributes.contains("#pubkey")){
      val deviceName = message.sender
      keyNameMapper-=deviceName
      if (!SessionManager.contains(deviceName)){
        // Send error message
        val reply = MessageUtils.createQuery(DATA, Map("#msg" -> "ERR:DEVICE_UNIDENTIFIED"), deviceName)
        device ! Tcp.Write(ByteString(reply))
      } else {
        // Logout the device
        SessionManager.logout(deviceName); // Remove from the session
        val reply = MessageUtils.createQuery(DATA, Map("#msg" -> "OK"), deviceName)
        device ! Tcp.Write(ByteString(reply))
        println("Device unregistered")
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
