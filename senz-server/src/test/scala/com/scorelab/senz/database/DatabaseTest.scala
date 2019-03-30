package com.scorelab.senz.database

import com.mongodb.casbah.commons.MongoDBObject
import org.scalatest.FunSuite

class DatabaseTest extends FunSuite {

  test("testConnection") {
    val coll = MongoFactory.db("test")
    coll.drop

    // Insert new object
    val builder = MongoDBObject.newBuilder
    builder += "name" -> "db test"
    val result = coll.insert(builder.result)

    // Check for the object
    val items = coll.find
    assert(items.count === 1)

    // Drop the collection
    coll.drop

  }
}
