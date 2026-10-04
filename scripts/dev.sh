#!/usr/bin/env bash
# ==============================================================================
# FERMION BEC PRODUCTIONS // LOCAL DEVELOPMENT SERVER & PORT ROUTER
# Dynamic port conflict resolution & graceful process management for macOS
# ==============================================================================

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_DIR}" || exit 1

DEFAULT_PORT=3000
MAX_PORT_ATTEMPTS=20
FALLBACK_PORT=8080

echo "========================================================"
echo " FERMION BEC PRODUCTIONS // LOCAL DEVELOPMENT SERVER"
echo " Portfolio & Client SOW Infrastructure"
echo "========================================================"
echo " Target Directory: ${REPO_DIR}"
echo " Host OS: $(uname -s) ($(uname -m))"
echo "========================================================"

# Function: Find available port starting from base
find_available_port() {
  local port=$1
  local attempts=0
  while [ $attempts -lt $MAX_PORT_ATTEMPTS ]; do
    if ! lsof -i :"$port" >/dev/null 2>&1; then
      echo "$port"
      return 0
    fi
    # Check if existing listener is an orphan python http.server from this repo
    local pid
    pid=$(lsof -ti :"$port" 2>/dev/null | head -n 1)
    if [ -n "$pid" ]; then
      local proc_cmd
      proc_cmd=$(ps -p "$pid" -o command= 2>/dev/null)
      if [[ "$proc_cmd" =~ "http.server" ]] && [[ "$proc_cmd" =~ "$REPO_DIR" ]]; then
        echo " [!] Found stale server instance (PID $pid) on port $port. Reclaiming..." >&2
        kill -9 "$pid" 2>/dev/null
        sleep 0.5
        echo "$port"
        return 0
      fi
    fi
    echo " [-] Port $port is active, testing next port..." >&2
    port=$((port + 1))
    attempts=$((attempts + 1))
  done
  echo "$FALLBACK_PORT"
}

ACTIVE_PORT=$(find_available_port "$DEFAULT_PORT")

# Trap SIGINT and SIGTERM for clean shutdown
cleanup() {
  echo ""
  echo "--------------------------------------------------------"
  echo " [✓] Gracefully shutting down server on port ${ACTIVE_PORT}..."
  exit 0
}
trap cleanup SIGINT SIGTERM

echo " [✓] Port Routing Locked: http://localhost:${ACTIVE_PORT}/"
echo " [✓] SOW Contract Portal: http://localhost:${ACTIVE_PORT}/proposal.html"
echo " [✓] Concepts Gallery:    http://localhost:${ACTIVE_PORT}/concepts.html"
echo "--------------------------------------------------------"
echo " Press CTRL+C to terminate."
echo "--------------------------------------------------------"

# Open default browser on macOS asynchronously
(sleep 0.8 && open "http://localhost:${ACTIVE_PORT}/") &

# Launch zero-overhead HTTP server bound to localhost
exec python3 -m http.server "${ACTIVE_PORT}" --bind 127.0.0.1 --directory "${REPO_DIR}"
