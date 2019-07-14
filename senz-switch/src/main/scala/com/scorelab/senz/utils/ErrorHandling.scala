package com.scorelab.senz.utils
import com.mongodb.casbah.Imports._
import play.api.libs.json._
import scala.collection.mutable.Set
import com.scorelab.senz.database.MongoFactory.publicKeyCollection


object ErrorHandling{
  val errorMapper=Map(
  500->"OK",
  501->"#ERR->SIGNATURE_NOT_AUTHORISED",
  502->"#ERR->SIGNATURE_NOT_VALID",
  503->"#ERR->DEVICES_NOT_COMPATIBLE",
  504->"#ERR->DEVICE_NOT_VALID",
  505->"#ERR->SENDER_RECEIVER_SAME",
  508->"#ERR->SYNTAX_INCORRECT"
  )
  var registerError=500
  var shareError=500
  private def signatureValid(signature:String,givenDevice:String):Int={
    val query=MongoDBObject("signature"->signature)
    val result=publicKeyCollection.find(query)
    if(result.size==0)
    {
      shareError=502
      return shareError
    }
    else
    {
        result.foreach(entry=>{
        val json:JsValue=Json.parse(entry.toString)
        val publicKey=(json \ "publicKey").as[String]
        if(publicKey==givenDevice){
          shareError=500
          return shareError
        }
      })
    
  }
  shareError=501
  shareError
  }
  private def signatureValid(signature:String,sender:String,receiver:String):Int={
    //Project List
    var senderProjects=Set[String]()
    var receiverProjects=Set[String]()
    //Check signature
    val signatureQuery=MongoDBObject("signature"->signature)
    val sigResult=publicKeyCollection.findOne(signatureQuery)
    sigResult match{
      case None=> {return 502}
      case Some(pkMap)=>shareError=500
    }
    //Check sender
    val senderQuery=MongoDBObject("publicKey"->sender)
    val senResult=publicKeyCollection.findOne(senderQuery)
    senResult match{
      case None=>{return 504}
      case Some(pkMap)=>{
        val json:JsValue=Json.parse(pkMap.toString)
        senderProjects=(json \ "projects").as[List[String]].to[collection.mutable.Set]
        shareError=500    
      }
    }
    //Check receiver
    val receiverQuery=MongoDBObject("publicKey"->receiver)
    val recResult=publicKeyCollection.findOne(receiverQuery)
    recResult match{
      case None=>{return 504}
      case Some(pkMap)=>{
        val json:JsValue=Json.parse(pkMap.toString)
        receiverProjects=(json \ "projects").as[List[String]].to[collection.mutable.Set]
        shareError=500
    }
    //Check the list of projects of sender and receiver
    if(senderProjects.intersect(receiverProjects).size==0)
    {
      return 503
    }else{
      shareError=500
    }
    

  }
  shareError
  }
  def registerHandler(query:String):Int={
      //Check if query is valid
      if(query.split(" ").length!=8)
      {
        return 508
      }
      //Break the query
      val queryArray=query.split(" ")
      val signature=query.split(" ")(7)
      val device=query.split(" ")(2)
      //Call different methods and assign registerError
      val statusCode=signatureValid(signature,device)
      statusCode
  }
  def shareHandler(query:String):Int={
    //Check if query is valid
    if(query.split(" ").length!=8){
      return 508
    }
    //Break the query
    val queryArray=query.split(" ")
    val signature=queryArray(7)
    val sender=queryArray(3).substring(1,queryArray(3).length)
    val receiver=queryArray(6).substring(1,queryArray(6).length)
    if(sender==receiver){
      return 505
    }
    //Call different methods and assign shareError
    val statusCode=signatureValid(signature,sender,receiver)
    statusCode
  }
  
  

  
}