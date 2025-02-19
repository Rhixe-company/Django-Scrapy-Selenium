#!/bin/bash
# sudo apt install python3-pip python3-venv python3-dev python3-full -y
# python3 --version
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget
wget https://www.python.org/ftp/python/3.13.1/Python-3.13.1.tgz
tar -xf Python-3.13.1.tgz
cd Python-3.13.1
./configure --prefix=/usr/local --with-bz2 --enable-optimizations
sudo make
sudo make install
python3 --version
