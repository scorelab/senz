package com.scorelab.senz.config

import com.typesafe.config._

// App configuration
object AppConfig {
  val environment: String = if (System.getenv("SCALA_ENV") == null) "development" else System.getenv("SCALA_ENV")

  val config: Config = ConfigFactory.load()
  def apply(): Config = config.getConfig(environment)
}
