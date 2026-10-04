#!/usr/bin/env bash
# Fermion Bec Productions - Automated SQLite Backup Wrapper
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_DIR}" || exit 1

python3 "${REPO_DIR}/scripts/backup_sqlite.py" "$@"
