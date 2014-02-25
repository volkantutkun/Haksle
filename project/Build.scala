import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "Kapsle"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    "postgresql" % "postgresql" % "8.4-702.jdbc4",
    "mysql" % "mysql-connector-java" % "5.1.18",
    "org.jsoup" % "jsoup" % "1.7.2",
    javaCore,
    javaJdbc,
    javaEbean,
    "com.feth"      %%  "play-authenticate" % "0.2.0-SNAPSHOT"
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
     resolvers += Resolver.url("play-easymail (release)", url("http://joscha.github.com/play-easymail/repo/releases/"))(Resolver.ivyStylePatterns),
     resolvers += Resolver.url("play-easymail (snapshot)", url("http://joscha.github.com/play-easymail/repo/snapshots/"))(Resolver.ivyStylePatterns),


     resolvers += Resolver.url("play-authenticate (release)", url("http://joscha.github.com/play-authenticate/repo/releases/"))(Resolver.ivyStylePatterns),
     resolvers += Resolver.url("play-authenticate (snapshot)", url("http://joscha.github.com/play-authenticate/repo/snapshots/"))(Resolver.ivyStylePatterns)
     
  )

}
