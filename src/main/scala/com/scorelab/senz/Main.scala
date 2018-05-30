package com.scorelab.senz

import com.scorelab.senz.socket._
import socket.SenzListener

object Main extends App{
  println("Initalizing SenZ..")

  // start listener
  try SenzListener.start()
  finally SenzListener.terminate()

}
