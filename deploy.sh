#!/bin/bash
cd /home/ubuntu/calander-front

echo "최신 변경 사항 가져오기..."
git pull origin develop

echo "의존성 설치..."
export NODE_ENV=production # 배포 환경에서만 필요한 의존성 설치
sudo npm ci --only=production # 빌드 결과와 종속성을 캐시하여 반복 빌드 시간 단축, .next/cache에 저장 후 재사용

echo "빌드 실행 중..."
sudo npm run build

echo "앱 재실행..."
pm2 start npm --name "tickita_app" -- start

echo "배포 성공!"