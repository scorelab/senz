package com.scorelab.senz.socket

import java.beans.EventHandler

import akka.actor.ActorRef

import scala.collection.mutable

object SessionManager {
  val sessions = new mutable.HashMap[String, ActorRef]

  def getSession(device: String): Some[ActorRef] = {
    Some(sessions(device))
  }

  def login(username: String, actorRef: ActorRef): Unit = {
    sessions += (username -> actorRef)
  }
}
