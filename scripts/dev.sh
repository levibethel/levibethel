#!/usr/bin/env bash
# Fermion Bec Productions - Local Dev Server & Watcher
# Optimized for macOS Apple Silicon / Intel with 32GB RAM

PORT=3000
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "========================================================"
echo " FERMION BEC PRODUCTIONS // LOCAL DEVELOPMENT SERVER"
echo " Portfolio & Concepts Packaging Suite"
echo "========================================================"
echo " Target Directory: ${REPO_DIR}"
echo " Host Machine: macOS (Darwin) | 32GB Unified Memory"
echo "========================================================"

cd "${REPO_DIR}" || exit 1

# Check if port 3000 is occupied, increment if needed
while lsof -i :$PORT >/dev/null 2>&1; do
  echo " Port $PORT in use, trying next port..."
  PORT=$((PORT + 1))
done

echo " [✓] Starting high-performance local server on port ${PORT}..."
echo " [✓] Local URL:   http://localhost:${PORT}/"
echo " [✓] Concepts:    http://localhost:${PORT}/#packaging"
echo " [✓] Direct Page: http://localhost:${PORT}/concepts.html"
echo ""
echo " Press CTRL+C to terminate."
echo "--------------------------------------------------------"

# Open default browser on macOS
(sleep 1 && open "http://localhost:${PORT}/#packaging") &

# Launch zero-overhead HTTP server
exec python3 -m http.server "${PORT}" --directory "${REPO_DIR}"
