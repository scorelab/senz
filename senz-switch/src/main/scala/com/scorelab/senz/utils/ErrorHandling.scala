package com.scorelab.senz.utils
import com.mongodb.casbah.Imports._
import play.api.libs.json._
import com.scorelab.senz.database.MongoFactory.publicKeyCollection


object ErrorHandling{
  val errorMapper=Map(
  500->"OK",
  501->"#ERR->SIGNATURE_NOT_AUTHORISED",
  502->"#ERR->SIGNATURE_NOT_VALID",
  503->"#ERR->USER_PROJECT_NOT_COMPATIBLE",
  504->"#ERR->SENDER_RECEIVER_NOT_COMPATIBLE",
  505->"#ERR->DEVICE_OFFLINE",
  506->"#ERR->PROJECT_OFFLINE",
  507->"#ERR->SENDER_RECEIVER_SAME",
  508->"#ERR->SYNTAX_INCORRECT"
  )
  var registerError=500
  private def signatureIntegrity(pkMap:String,givenDevice:String):Unit={
    val pkMapJson:JsValue=Json.parse(pkMap)
    val actualDevice=(pkMapJson \ "publicKey").as[String]
    if(givenDevice!=actualDevice){
      registerError=501
    }else{
      registerError=500
    }  
  }
  private def signatureValid(signature:String,givenDevice:String):Unit={
    val query=MongoDBObject("signature"->signature)
    val result=publicKeyCollection.findOne(query)
    result match {
      case None => registerError=502
      case Some(pkMap)=> signatureIntegrity(pkMap.toString,givenDevice)
    }
  }
  def registerHandler(query:String):Int={
      //Check if query is valid
      if(query.split(" ").length!=8)
      {
        508
      }
      //Break the query
      val queryArray=query.split(" ")
      val signature=query.split(" ")(7)
      val device=query.split(" ")(2)
      //Call different methods and assign registerError
      signatureValid(signature,device)
      registerError
  }
 
  
  

  
}