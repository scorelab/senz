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
    * @param attr
    * @return
    */
  private def getAttributes(tokens: Array[String], attr: Map[String, String] = Map[String, String]()): Map[String, String] = {
    tokens match {
      case Array() =>
        attr
      case Array(_) =>
        if (tokens(0).startsWith("#")) attr + (tokens(0) -> "") else attr
      case Array(_, _*) =>
        if (tokens(0).startsWith("#")) {
          if (tokens(1).startsWith("#") || tokens(1).startsWith("$")) {
            getAttributes(tokens.drop(1), attr + (tokens(0) -> ""))
          } else {
            getAttributes(tokens.drop(2), attr + (tokens(0) -> tokens(1)))
          }
        } else if (tokens(0).startsWith("$")) {
          getAttributes(tokens.drop(2), attr + (tokens(1) -> tokens(2)))
        } else {
          attr
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
    tokens.find(_.startsWith("*")).get.trim.substring(1)
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
