#!/bin/bash
cd /home/ubuntu/calander-front
git pull origin develop
sudo npm install
sudo npm run build
pm2 restart tickita_app