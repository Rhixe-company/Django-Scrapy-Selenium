#!/bin/bash

sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
# sudo apt-get install postgresql postgresql-contrib metasploit-framework
sudo passwd postgres
sudo service postgresql start
sudo -u postgres psql
