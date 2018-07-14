package com.scorelab.senz.utils

import com.scorelab.senz.models.MessageType.MessageType
import com.scorelab.senz.models.{Message, MessageType}

object MessageUtils {
  /** Parse the query to message structure
    *
    * @param query
    * @return
    */
  def parseMessage(query: String): Message = {
    val tokens = query.trim().split(" ")

    val messageType = getType(tokens)
    val attributes = getAttributes(tokens)
    val sender = getSender(tokens)
    val receiver = getReceiver(tokens)
    val signature = getSignature(tokens)

    // return message object
    Message(messageType, attributes, sender, receiver, signature)
  }

  /** Get message type from tokens
    *
    * @param tokens
    * @return
    */
  private def getType(tokens: Array[String]): MessageType = {
    MessageType.withName(tokens.head.trim)
  }

  /** Get attributes from tokens
    *
    * @param tokens
    * @param attributeList
    * @return
    */
  private def getAttributes(tokens: Array[String], attributeList: Map[String, String] = Map[String, String]()): Map[String, String] = {
    tokens match {
      case Array() | Array("") =>
        attributeList
      case Array(_) =>
        if (tokens(0).startsWith("#")) attributeList + (tokens(0) -> "") else attributeList
      case Array(_, _*) =>
        if (tokens(0).startsWith("#")){
          if (List("#", "$", "@").exists(x => tokens(1).startsWith(x))){
            getAttributes(tokens.drop(1), attributeList + (tokens(0) -> ""))
          } else {
            getAttributes(tokens.drop(2), attributeList + (tokens(0) -> tokens(1)))
          }
        } else if (tokens(0).startsWith("$")) {
          getAttributes(tokens.drop(2), attributeList + (tokens(0) -> tokens(1)))
        } else {
          getAttributes(tokens.drop(1), attributeList)
        }
    }
  }

  /** Get sender from tokens
    *
    * @param tokens
    * @return
    */
  private def getSender(tokens: Array[String]): String = {
    tokens.find(_.startsWith("^")).get.trim.substring(1)
  }

  /** Get receiver from tokens
    *
    * @param tokens
    * @return
    */
  private def getReceiver(tokens: Array[String]): String = {
    tokens.find(_.startsWith("@")).get.trim.substring(1)
  }

  /** Get signature from tokens
    *
    * @param tokens
    * @return
    */
  private def getSignature(tokens: Array[String]): Option[String] = {
    Some(tokens.tail.last.trim)
  }
}
