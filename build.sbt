name := "MySenZ"

version := "0.1"

scalaVersion := "2.12.6"
lazy val akkaVersion = "2.5.12"

libraryDependencies ++= Seq(
  "org.scalactic" %% "scalactic" % "3.0.5",
  "org.scalatest" %% "scalatest" % "3.0.5" % "test",
  "com.typesafe.akka" %% "akka-actor" % akkaVersion,
  "com.typesafe.akka" %% "akka-testkit" % akkaVersion
)

//resolvers += "Artima Maven Repository" at "http://repo.artima.com/releases"