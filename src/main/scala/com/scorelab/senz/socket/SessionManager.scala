package com.scorelab.senz.socket

import java.beans.EventHandler

import akka.actor.ActorRef

import scala.collection.mutable

object SessionManager {
  val sessions = new mutable.HashMap[String, ActorRef]

  /** Get session by it's key
    *
    * @param device
    * @return
    */
  def getSession(device: String): Some[ActorRef] = {
    Some(sessions(device))
  }

  /** Login and add reference to sessions
    *
    * @param deviceName
    * @param actorRef
    */
  def login(deviceName: String, actorRef: ActorRef): Unit = {
    sessions += (deviceName -> actorRef)
  }

  /** Logout and remove reference from sessions
    *
    * @param deviceName
    */
  def logout(deviceName: String): Unit = {
    sessions -= deviceName
  }

  /** Check if the device is already exists in the session
    *
    * @param deviceName
    * @return
    */
  def contains(deviceName: String): Boolean = {
    sessions.contains(deviceName)
  }
}
