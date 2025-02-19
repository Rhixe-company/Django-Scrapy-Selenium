#!/bin/bash
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server.service
sudo systemctl start redis-server.service

sudo systemctl status redis-server.service
#sudo nano /etc/redis/redis.conf
redis-cli ping
