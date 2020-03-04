#!/usr/bin/env bash
echo "Installation Started"
sudo yum update

mkdir tmp
cd tmp

echo "Installing MongoDB"
sudo cp mongodb-org-yum.repo /etc/yum.repos.d/mongodb-org.repo
sudo yum update
sudo yum install mongodb-org
echo "MongoDB Installed"

echo "Installing Java"
yum  -y install java-1.8.0-openjdk
echo "Java Installed"

echo "Downloading rmp file of Scala"
wget http://downloads.lightbend.com/scala/2.12.2/scala-2.12.2.rpm
echo "Download completed"

echo "Installing Scala"
sudo yum -y install scala-2.12.2.rpm
echo "Scala Installed"

echo "Downloading rmp file of SBT"
wget http://dl.bintray.com/sbt/rpm/sbt-0.13.5.rpm
echo "Download completed"

echo "Installing SBT"
sudo yum -y install sbt-0.13.5.rpm
echo "SBT Installed"

echo "Installation Finished"
echo "Removing the file"
cd ..
sudo rm -r tmp

