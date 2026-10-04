# Google Jules Task Prompt: Repository Port Routing & SQLite Backup Architecture

> **How to use**: When you connect the `LeviBethel_Portfolio` repository to Google Jules on GitHub, paste the prompt below as the task instruction for Jules.

---

### Copy-Paste Jules Prompt:

```markdown
You are an autonomous engineering agent working on the Fermion Bec Productions repository.

## Mission:
1. Verify and reinforce local development port routing (`scripts/dev.sh`) to eliminate any port collision or zombie process issues on macOS.
2. Verify zero-downtime SQLite online backup automation (`scripts/backup_sqlite.py`) for studio data retention in WAL mode.
3. Review and align against all architectural standards defined in `AGENTS.md`.

## Strict Guardrails:
- Entity Name: Strictly "Fermion Bec Productions" or "FBP". Never append "LLC" or use standalone "Fermion Bec".
- Typography: Preserve the strict 3-font system (Plus Jakarta Sans for display/titles, Inter for body/UI, JetBrains Mono for HUD/code). Never introduce serifs or external font families.
- Experience & Gear: Exactly 10+ years production experience on set, 8 years specialized mentorship. Never claim owned camera/optics equity or broadcast network leadership.
- External Citations: Never mention "VAOS" or external coach/playbook names in code or copy.

## Requirements:
1. Ensure `scripts/dev.sh` dynamically locates available ports (starting at 3000, checking up to 3020, with fallback to 8080), gracefully handles SIGINT/SIGTERM, and reclaims orphan processes bound to this repo directory.
2. Ensure `scripts/backup_sqlite.py` performs safe, zero-downtime online backups using the native SQLite backup API, verifies database integrity (`PRAGMA integrity_check`), and rotates old backups to preserve the latest 7 daily snapshots.
3. Add a macOS `launchd` plist template in `scripts/com.fermion.sqlite-backup.plist` so the backup script can run silently every 24 hours on macOS.
4. Verify that running `bash scripts/build.sh` passes all integrity checks.
```
