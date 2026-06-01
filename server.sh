#!/usr/bin/env bash
# DesignForge — Permanent Production Server
# Usage: ./server.sh {start|stop|restart|status|logs}

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
PID_FILE="${APP_DIR}/.server.pid"
LOG_FILE="${APP_DIR}/.server.log"

start() {
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "Server is already running (PID: $(cat "$PID_FILE"))"
    exit 0
  fi

  echo "Starting DesignForge production server on ${HOST}:${PORT}..."
  cd "$APP_DIR"

  npm run build 2>>"$LOG_FILE"

  nohup npx next start -H "$HOST" -p "$PORT" >> "$LOG_FILE" 2>&1 &
  PID=$!
  echo "$PID" > "$PID_FILE"

  sleep 2
  if kill -0 "$PID" 2>/dev/null; then
    echo "✓ Server started (PID: $PID)"
    echo "  Local:   http://localhost:${PORT}"
    echo "  Network: http://$(hostname):${PORT}"
  else
    echo "✗ Server failed to start. Check logs: tail -f ${LOG_FILE}"
    rm -f "$PID_FILE"
    exit 1
  fi
}

stop() {
  if [ ! -f "$PID_FILE" ]; then
    echo "No server running (no PID file found)"
    return 0
  fi

  PID=$(cat "$PID_FILE")
  echo "Stopping server (PID: $PID)..."
  kill "$PID" 2>/dev/null || true
  rm -f "$PID_FILE"
  echo "✓ Server stopped"
}

restart() {
  stop
  sleep 1
  start
}

status() {
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "DesignForge server is RUNNING"
    echo "  PID:     $(cat "$PID_FILE")"
    echo "  Port:    ${PORT}"
    echo "  URL:     http://localhost:${PORT}"
    echo "  Uptime:  $(ps -o etime= -p "$(cat "$PID_FILE")" | tr -d ' ')"
  else
    echo "DesignForge server is STOPPED"
  fi
}

logs() {
  tail -f "$LOG_FILE"
}

case "${1:-help}" in
  start|stop|restart|status|logs)
    "$1"
    ;;
  *)
    echo "DesignForge Server Manager"
    echo "Usage: $0 {start|stop|restart|status|logs}"
    ;;
esac
