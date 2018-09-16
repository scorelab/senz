name := "senz"

version := "0.1"

scalaVersion := "2.12.6"
lazy val akkaVersion = "2.5.12"

libraryDependencies ++= Seq(
  "org.scalactic" %% "scalactic" % "3.0.5",
  "org.scalatest" %% "scalatest" % "3.0.5" % "test",
  "com.typesafe.akka" %% "akka-actor" % akkaVersion,
  "com.typesafe.akka" %% "akka-testkit" % akkaVersion,
  "org.mongodb" %% "casbah" % "3.1.1",
  "org.slf4j" % "slf4j-simple" % "1.6.4",
  "javax.xml.bind" % "jaxb-api" % "2.2.6"
)

scalacOptions += "-deprecation"

//resolvers += "Artima Maven Repository" at "http://repo.artima.com/releases"
