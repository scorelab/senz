package com.scorelab.senz.utils
import scalaj.http._
import play.api.libs.json._
object ErrorHandling{
  val errorMapper=Map(
  500->"OK",
  501->"#ERR->USER_NOT_AUTHORISED",
  502->"#ERR->PROJECT_NOT_VALID",
  503->"#ERR->USER_PROJECT_NOT_COMPATIBLE",
  504->"#ERR->SENDER_RECEIVER_NOT_COMPATIBLE",
  505->"#ERR->DEVICE_OFFLINE",
  506->"#ERR->PROJECT_OFFLINE",
  507->"#ERR->SENDER_RECEIVER_SAME",
  508->"#ERR->SYNTAX_INCORRECT"
  )
  def errorHandler(query:String):Int={
      val queryArray=query.split(" ")
      if(queryArray.length!=8){
      508
      }
      else{
          val sender=queryArray(6).substring(1,queryArray(6).length)
          val receiver=queryArray(3).substring(1,queryArray(3).length)
          val userId=queryArray(7).split("-")(0)
          val projectId=queryArray(7).split("-")(1)
          val data=s"""{"userId":"$userId","projectId":"$projectId","sender":"$sender","receiver":"$receiver"}"""
          val response: HttpResponse[String] = Http("http://localhost:8080/switch/check").postData(data).header("content-type", "application/json").asString
          val json: JsValue = Json.parse(response.body)
          val err = (json \ "error").as[Int]
          err
           

      }
  }
 
  
  

  
}