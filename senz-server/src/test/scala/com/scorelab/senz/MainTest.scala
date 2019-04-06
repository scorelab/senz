package com.scorelab.senz

//import org.mongodb.scala.{Completed, Document, MongoClient, MongoCollection, MongoDatabase, Observable, Observer}
import org.scalatest.FunSuite
//import org.mongodb.scala._

//import com.mongodb.casbah.Imports._

class MainTest extends FunSuite {
  test("Test"){
//    val mongoClient: MongoClient = MongoClient()
//    val database: MongoDatabase = mongoClient.getDatabase("mydb")
//
//    val collection: MongoCollection[Document] = database.getCollection("test")
//
//
//    val doc: Document = Document("_id" -> 0, "name" -> "MongoDB", "type" -> "database",
//      "count" -> 1, "info" -> Document("x" -> 203, "y" -> 102))
//    collection.insertOne(doc)
    // To directly connect to the default server localhost on port 27017
//      val mongoClient: MongoClient = MongoClient()

    // Use a Connection String
//    val mongoClient: MongoClient = MongoClient("mongodb://localhost")

    // or provide custom MongoClientSettings
    //  val clusterSettings: ClusterSettings = ClusterSettings.builder().hosts(List(new ServerAddress("localhost")).asJava).build()
    //  val settings: MongoClientSettings = MongoClientSettings.builder().clusterSettings(clusterSettings).build()
    //  val mongoClient: MongoClient = MongoClient(settings)

//    val database: MongoDatabase = mongoClient.getDatabase("mydb");
//
//    val collection: MongoCollection[Document] = database.getCollection("items")
//
//    val doc: Document = Document("_id" -> 0, "name" -> "MongoDB", "type" -> "database",
//      "count" -> 1, "info" -> Document("x" -> 203, "y" -> 102))
//    collection.insertOne(doc)
//    collection.find.first().printResults()

    //    val collection: MongoCollection[Document] = database.getCollection("movie");

//    val doc: Document = Document("_id" -> 0, "name" -> "MongoDB", "type" -> "database",
//      "count" -> 1, "info" -> Document("x" -> 203, "y" -> 102))

//    collection.insertOne(doc);

    // Explictly subscribe:
//    val observable: Observable[Completed] = collection.insertOne(doc)
//    observable.insertOne(doc).subscribe(new Observer[Completed] {
//
//      override def onNext(result: Completed): Unit = println("Inserted")
//
//      override def onError(e: Throwable): Unit = println("Failed")
//
//      override def onComplete(): Unit = println("Completed")
//    })

//    case class Stock (symbol: String, price: Double)
//
//    def buildMongoDbObject(stock: Stock): MongoDBObject = {
//      val builder = MongoDBObject.newBuilder
//      builder += "symbol" -> stock.symbol
//      builder += "price" -> stock.price
//      builder.result
//    }
  }
}
