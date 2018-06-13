package com.scorelab.senz.database

import com.mongodb.casbah.{MongoClient, MongoCollection, MongoConnection}
import com.scorelab.senz.config.AppConfig

object MongoFactory {
 //  DB Connection
  val SERVER: String = AppConfig().getString("db.mongo.host")
  val PORT: Int = AppConfig().getInt("db.mongo.port")
  val DATABASE: String = AppConfig().getString("db.mongo.database")

 //  DB Collections
  val connection = MongoConnection(SERVER)
  val senzCollection: MongoCollection = connection(DATABASE)("senz")
  val clientsCollection: MongoCollection = connection(DATABASE)("clients")
}