# AUDIT_Django-Scrapy-Selenium.md

> Read-only repo-management audit — Phases 0, 2, 3.
> Destructive phases (1: branch delete/push, 4: create CI) HELD for user approval.
> Generated: 2026-07-16

## Overview
- **Type**: Django + Scrapy + Selenium web application (crawler/scraper with API and web UI).
- **Docs present**: `README.md`, `AGENTS.md`, `ARCHITECTURE.md`, `API_REFERENCE.md`, plus guides.
- **Tooling**: Python (Django, Scrapy, Selenium), Node (Tailwind/webpack frontend), Bun, Playwright, geckodriver, Docker, justfile/Makefile.
- **Manifest**: `package.json` (frontend), `pyproject.toml` (Django profile), `requirements.txt` (redirects to `requirements/production.txt`). Mixed JS + Python stack.

## Disk Usage
- `30M` (excludes `.git`, `node_modules`, `venv`, `__pycache__`, `dist`, `build`, `target`).
- Largest non-source artifacts: `geckodriver.exe` (~4.3 MB), `api.sqlite3` (~1 MB), `comics.json` (~320 KB), `chapters.json` (~506 KB), `node_modules/` (658 packages).

## Entrypoint
- Detected: `manage.py` present (Django entry: `python manage.py runserver`).
- No `package.json` `main`/`start`, no `main.py`/`def main` in root.
- Additional: `scrapy.cfg` (Scrapy), `sel.py` (Selenium helper), `justfile`/`Makefile` for orchestration.

## Gitignore Audit (missing entries)
`.gitignore` EXISTS (4560 bytes). Coverage check against the standard baseline:

| Entry | Status |
|-------|--------|
| `node_modules/` | PRESENT |
| `.env` | PRESENT |
| `*.pyc` | **MISSING** |
| `__pycache__/` | PRESENT |
| `dist/` | PRESENT |
| `build/` | PRESENT |
| `.next/` | **MISSING** |
| `venv/` | PRESENT |
| `.DS_Store` | PRESENT |

**Missing entries:** `*.pyc`, `.next/`
- Impact: low/medium. `*.pyc` repeatedly missing is a Python-stack gap (Django generates `.pyc`). `.next/` not relevant (uses webpack, not Next). Verified `.env` is NOT currently tracked. Also note: `geckodriver.exe` and `api.sqlite3` are committed binaries — worth reviewing whether they should be gitignored (not part of the standard baseline but a hygiene flag).

## Dependency Audit (manifest type, top deps, audit-tool availability)
- **Manifest type**: `package.json` + `pyproject.toml` + `requirements/`. Note: **NO lockfile** (`bun.lock`/`package-lock.json`/`yarn.lock` absent) — `bun pm ls` errors with "Lockfile not found". `node_modules/` has 658 package dirs.
- **JS top deps (sample from package.json)**: `tailwindcss@^3.4.17` (plus React/webpack stack implied).
- **Python top deps**: pulled from `requirements/production.txt` (Django, Scrapy, Selenium, DRF, etc.) — not fully enumerated here.
- **Audit tool availability**: `bun audit` exists but cannot run without a lockfile. `pip-audit` NOT installed (note only); `pip list` available. Recommend generating a lockfile and/or running `pip-audit` under user approval.
- **Outdated/known-bad flags**: `tailwindcss@^3.4.17` is a v3 pin (v4 is current) — minor staleness, not a security issue. Full audit requires a lockfile.

## Branch State
```
* development
  production
```
- Two branches: `development` (current) and `production`.
- No stray `master` or orphan branches. Branch naming follows the `development`/`production` convention.

## Destructive Phases HELD (pending approval)
- **Phase 1** (branch deletion / push): HELD. No branches slated for deletion; nothing pushed.
- **Phase 4** (create CI): HELD. No CI workflow file created (repo already has `.github/`; not modified).

> Next step (approval required): add a JS lockfile + run `pip-audit`, then optionally proceed to Phase 1/4.
