#!/usr/bin/env python3
"""
Fermion Bec Productions — Zero-Downtime SQLite Backup & Rotation Engine
Uses SQLite Online Backup API to safely snapshot active databases in WAL mode.
"""

import os
import sys
import time
import sqlite3
import argparse
from datetime import datetime

DEFAULT_CANDIDATE_PATHS = [
    os.environ.get("FERMION_DB_PATH", ""),
    os.path.join(os.getcwd(), "fermion_studio.db"),
    os.path.join(os.getcwd(), "data", "fermion_studio.db"),
    os.path.join(os.getcwd(), "data", "studio.db"),
    os.path.join(os.getcwd(), "data", "leads.db"),
]

def find_database(specified_path=None):
    if specified_path and os.path.exists(specified_path):
        return os.path.abspath(specified_path)
    for p in DEFAULT_CANDIDATE_PATHS:
        if p and os.path.exists(p):
            return os.path.abspath(p)
    return None

def verify_integrity(conn):
    cursor = conn.cursor()
    cursor.execute("PRAGMA integrity_check;")
    result = cursor.fetchone()
    return result and result[0] == "ok"

def perform_online_backup(source_db_path, backup_dir, retain_daily=7, retain_weekly=4):
    os.makedirs(backup_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    base_name = os.path.splitext(os.path.basename(source_db_path))[0]
    dest_filename = f"{base_name}_backup_{timestamp}.db"
    dest_path = os.path.join(backup_dir, dest_filename)

    print(f"[*] Source Database: {source_db_path} ({os.path.getsize(source_db_path) / 1024:.1f} KB)")
    print(f"[*] Target Snapshot: {dest_path}")

    # Connect with WAL mode compatibility
    src_conn = sqlite3.connect(f"file:{source_db_path}?mode=ro", uri=True)
    if not verify_integrity(src_conn):
        src_conn.close()
        raise RuntimeError("Source database integrity check failed before backup.")

    dest_conn = sqlite3.connect(dest_path)
    
    # Progress callback
    def progress(status, remaining, total):
        pct = 100 * (total - remaining) / max(total, 1)
        print(f"\r -> Backup progress: {pct:.1f}% ({total - remaining}/{total} pages)", end="")

    print("[*] Initiating zero-downtime online backup...")
    with dest_conn:
        src_conn.backup(dest_conn, pages=100, progress=progress)
    print("\n[✓] Online backup completed successfully.")

    src_conn.close()
    dest_conn.close()

    # Verify backup integrity
    verify_conn = sqlite3.connect(dest_path)
    if verify_integrity(verify_conn):
        print(f"[✓] Backup integrity verified: OK ({os.path.getsize(dest_path) / 1024:.1f} KB)")
    else:
        verify_conn.close()
        raise RuntimeError("Backup file failed integrity verification.")
    verify_conn.close()

    # Rotate old backups
    rotate_backups(backup_dir, base_name, retain_daily)
    return dest_path

def rotate_backups(backup_dir, base_name, max_keep=7):
    files = [
        os.path.join(backup_dir, f)
        for f in os.listdir(backup_dir)
        if f.startswith(f"{base_name}_backup_") and f.endswith(".db")
    ]
    files.sort(key=os.path.getmtime, reverse=True)
    
    if len(files) > max_keep:
        print(f"[*] Rotating backups (retaining {max_keep} most recent)...")
        for old_file in files[max_keep:]:
            try:
                os.remove(old_file)
                print(f" [-] Pruned old snapshot: {os.path.basename(old_file)}")
            except OSError as e:
                print(f" [!] Warning: Could not prune {old_file}: {e}")

def main():
    parser = argparse.ArgumentParser(description="Fermion Bec Productions SQLite Backup Engine")
    parser.add_argument("--db", default=None, help="Path to source SQLite database file")
    parser.add_argument("--dest", default="backups", help="Target backup directory (default: ./backups)")
    parser.add_argument("--retain", type=int, default=7, help="Number of recent backups to keep (default: 7)")
    args = parser.parse_args()

    db_path = find_database(args.db)
    if not db_path:
        # If no DB currently exists, initialize a sample local studio database for verification
        print("[!] No existing SQLite database found at default candidate paths.")
        print("[*] Initializing local studio ledger (data/fermion_studio.db) to demonstrate backup integrity...")
        os.makedirs("data", exist_ok=True)
        demo_db = os.path.abspath("data/fermion_studio.db")
        conn = sqlite3.connect(demo_db)
        with conn:
            conn.execute("PRAGMA journal_mode=WAL;")
            conn.execute("""
                CREATE TABLE IF NOT EXISTS system_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT,
                    level TEXT,
                    module TEXT,
                    message TEXT
                );
            """)
            conn.execute("""
                INSERT INTO system_logs (timestamp, level, module, message)
                VALUES (datetime('now'), 'INFO', 'startup', 'Fermion Studio ledger initialized');
            """)
        conn.close()
        db_path = demo_db

    try:
        perform_online_backup(db_path, args.dest, retain_daily=args.retain)
    except Exception as e:
        print(f"[!] Backup failed: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
