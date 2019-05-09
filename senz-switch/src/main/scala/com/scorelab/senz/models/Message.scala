package com.scorelab.senz.models

import com.scorelab.senz.models.MessageType.MessageType

/** Enum; for Message Types  */
object MessageType extends Enumeration {
  type MessageType = Value
  val SHARE, UNSHARE, GET, PUT, DATA = Value
}

/** Structure of the message
  *
  * @param messageType the type of the message
  * @param attributes the attributes
  * @param sender the sender of the message
  * @param receiver the receiver of the message
  * @param signature the digital signature of the sender
  */
case class Message(
                    messageType: MessageType,
                    attributes: Map[String, String],
                    sender: String,
                    receiver: String,
                    signature: Option[String] = None)

