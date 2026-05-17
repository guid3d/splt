#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  echo ""
  echo "Stopping servers..."
  kill "$PB_PID" "$NEXT_PID" 2>/dev/null
  wait "$PB_PID" "$NEXT_PID" 2>/dev/null
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "Starting PocketBase..."
"$SCRIPT_DIR/db/pocketbase" serve --dir "$SCRIPT_DIR/db/pb_data" &
PB_PID=$!

echo "Starting Next.js..."
cd "$SCRIPT_DIR" && npm run dev &
NEXT_PID=$!

echo "PocketBase: http://127.0.0.1:8090"
echo "Next.js:    http://localhost:3000"
echo "Press Ctrl+C to stop both."

wait
