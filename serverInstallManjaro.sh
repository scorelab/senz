#!/usr/bin/env bash
echo "Installation Started"
sudo pacman -Syu

mkdir tmp
cd tmp

echo "Downloading binaries of MongoDB"
sudo git clone https://aur.archlinux.org/mongodb-bin.git
echo "Dwonlaodd completed"

echo "Installing MongoDB"
cd mongodb-bin
sudo makepkg -si
cd ..
echo "MongoDB Installed"

echo "Installing Java"
sudo  pacman -S jdk8-openjdk --noconfirm
echo "Java Installed"

echo "Installing Scala"
sudo  pacman -S scala --noconfirm
echo "Scala Installed"

echo "Installing SBT"
sudo pacman -S sbt --noconfirm
echo "SBT Installed"

echo "Installation Finished"
echo "Removing the file"
cd ..
sudo rm -r tmp

