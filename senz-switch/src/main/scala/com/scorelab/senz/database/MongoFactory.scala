package com.scorelab.senz.database

import com.mongodb.casbah.{MongoClient, MongoCollection, MongoConnection}
import com.scorelab.senz.config.AppConfig

object MongoFactory {
  //  DB Configs
  val SERVER: String = AppConfig().getString("db.mongo.host")
  val PORT: Int = AppConfig().getInt("db.mongo.port")
  val DATABASE: String = AppConfig().getString("db.mongo.database")

  //  DB Connection
  val mongoClient = MongoClient(SERVER)
  val db = mongoClient(DATABASE)

  // DB Collections
  val clientsCollection = db("clients")
  val senzCollection = db("senz")
  val logCollection=db("logs")
}