#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${HUB_HOST:-root@2.29.15.99}"
REMOTE="${HUB_REMOTE:-/opt/nyce}"

rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .env \
  --exclude .db \
  --exclude '.db-*' \
  --exclude files \
  --exclude '*.db' \
  --exclude tsconfig.tsbuildinfo \
  --exclude playwright-report \
  --exclude test-results \
  --exclude proposal \
  --exclude AGENTS.md \
  --exclude CLAUDE.md \
  "$ROOT/" "$HOST:$REMOTE/"

ssh -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=20 "$HOST" "bash -s" <<'REMOTE'
set -euo pipefail
cd /opt/nyce
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
if docker exec deploy-app-1 test -f /data/.db 2>/dev/null; then
  docker exec deploy-app-1 cp /data/.db "/data/.db.pre-${STAMP}" || true
fi
docker compose --env-file /opt/nyce/.env -f deploy/docker-compose.yml build --no-cache app
docker compose --env-file /opt/nyce/.env -f deploy/docker-compose.yml up -d --force-recreate app
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
  status="$(docker inspect --format '{{.State.Health.Status}}' deploy-app-1 2>/dev/null || echo starting)"
  echo "health ${status}"
  if [ "${status}" = "healthy" ]; then
    break
  fi
  sleep 5
done
docker inspect --format '{{.State.Status}} {{.State.Health.Status}}' deploy-app-1
REMOTE

curl -sS -o /dev/null -w "home:%{http_code}\n" --max-time 25 "https://hub.2.29.15.99.sslip.io/"
curl -sS -o /dev/null -w "sign-in:%{http_code}\n" --max-time 25 "https://hub.2.29.15.99.sslip.io/sign-in"
curl -sS -o /dev/null -w "about:%{http_code}\n" --max-time 25 "https://hub.2.29.15.99.sslip.io/about"
