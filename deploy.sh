#!/bin/bash
cd /home/ubuntu/calander-front

git add .
git commit -m "자동 커밋: 자동 배포를 위한 변경사항 커밋"

echo "최신 변경 사항 가져오기..."
git pull origin develop

echo "의존성 설치..."
sudo npm install

echo "빌드 실행 중..."
npm run build

echo "기존 앱 종료..."
pm2 stop tickita_app || true

echo "앱 재실행..."
pm2 start npm --name "tickita_app" -- start

echo "배포 성공!"