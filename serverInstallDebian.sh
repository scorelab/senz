echo "Installation Started"
sudo apt update
echo "Installing MongoDB"
sudo apt install -y mongodb
echo "MongoDB Installed"

echo "Installing Java"
sudo apt-get install openjdk-8-jdk
echo "Java Installed"

echo "Installing Scala"
wget https://downloads.lightbend.com/scala/2.12.8/scala-2.12.8.deb
sudo dpkg -i scala-2.12.8.deb
echo "Scala Installed"

echo "Installing SBT"
echo "deb https://dl.bintray.com/sbt/debian /" | sudo tee -a /etc/apt/sources.list.d/sbt.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823
sudo apt-get update
sudo apt-get install sbt
echo "SBT Installed"

echo "Installation Finished"
echo "Removing the file"
sudo rm scala-2.12.8.deb

