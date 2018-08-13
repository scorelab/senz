package com.scorelab.senz.socket

import java.beans.EventHandler

import akka.actor.ActorRef

import scala.collection.mutable

object SessionManager {
  val sessions = new mutable.HashMap[String, ActorRef]

  // Get session by it's key
  def getSession(device: String): Some[ActorRef] = {
    Some(sessions(device))
  }

  // Login and add reference to sessions
  def login(username: String, actorRef: ActorRef): Unit = {
    sessions += (username -> actorRef)
  }

  // Logout and remove reference from sessions
  def logout(username: String): Unit = {
    sessions -= username
  }
}
