# REPOSITORY_SUMMARY.md — Django-Scrapy-Selenium

> Generated from actual git history and repository files. Evidence-based; nothing fabricated.

## Overview

**Django-Scrapy-Selenium** is a **web scraping platform** that combines Django (admin/dashboard), Scrapy (spiders), Selenium (browser automation for JS-heavy pages), and Celery (async task processing), fronted by a Tailwind-styled dashboard. Per `AGENTS.md` and `README.md`, it is a **legacy project** — "newer scraping work moved to `rhixecompany-comics`" / "later consolidated into `projects/rhixecompany-comics`."

This is a real, sizable Python/Django codebase with a committed `api.sqlite3` (1 MB), `chapters.json` (507 KB), `comics.json` (320 KB), and a `geckodriver.exe` binary — artifacts showing it was used to crawl and store comic content.

## Architecture

- **Type:** Django-based scraping platform with multiple scraping engines
- **Pattern:** Django monolith + Scrapy spiders + Selenium automation + Celery async tasks; ETL pipeline pattern with dual scraping engines
- **Stack:**
  - **Backend:** Python 3.10+, Django 4.x/5.0, Django REST Framework
  - **Scraping:** Scrapy, Selenium WebDriver, BeautifulSoup4
  - **Async:** Celery + Redis/RabbitMQ broker
  - **Frontend:** Webpack 5, Tailwind CSS 3 (daisyui, flowbite), Alpine.js, htmx, hyperscript, jQuery, TypeScript ^5.4.5
  - **Database:** PostgreSQL (prod), SQLite (dev, `api.sqlite3`)
  - **Serving:** Gunicorn; Docker Compose; Traefik reverse proxy + Let's Encrypt in production

### Layer map (from `ARCHITECTURE.md`)
```
Client (Browser / API / Admin)
   → Django (config/) → api/ (DRF apps) + crawler/ (Scrapy spiders) + fixtures/
      → Scrapy + Selenium (sel.py direct Selenium) → Django ORM models
         → PostgreSQL / SQLite / JSON files (comics.json, chapters.json)
   → Tailwind Dashboard + REST API (DRF)
```

## Key Components

- **`config/`** — Django project settings (layered local/production/test via django-environ), URLs, Celery config.
- **`api/`** — Django applications (models, views, DRF API).
- **`crawler/`** — Scrapy spider definitions (`crawler/spiders/`).
- **`src/`** — Frontend Node.js source (`src/scrape.js` Selenium entry, `sass/`).
- **`templates/` / `static/`** — Django Tailwind templates & assets.
- **`webpack/`** — `dev.config.js`, `prod.config.js`.
- **`compose/`** — multi-environment Docker Compose (incl. Traefik).
- **`fixtures/`** — test data; **`tests/`** — pytest suite.
- **`locale/`** — i18n files.
- **`sel.py`** — direct Selenium scraping script.
- **`scrapy.cfg`**, **`manage.py`**, **`pyproject.toml`**, **`requirements/`**.
- **Data artifacts:** `api.sqlite3`, `chapters.json`, `comics.json` (should be gitignored per notes).

## Technologies

From `technology-stack.md` / `ARCHITECTURE.md`:
- **Backend:** Python 3.10+, Django 4.x (notes say 5.0 in ARCHITECTURE), DRF, Celery, Redis/RabbitMQ
- **Scraping:** Scrapy, Selenium WebDriver, BeautifulSoup4
- **Frontend:** Webpack, Tailwind CSS 3, Alpine.js, htmx, jQuery, TypeScript ^5.4.5
- **Database:** PostgreSQL (prod), SQLite (dev), JSON files
- **Infra:** Gunicorn, Docker Compose, Traefik
- **Quality:** pytest, Prettier, ESLint, ruff, mypy, Black, djlint

## Data Flow

1. **Crawl initiation:** Admin triggers crawl via Django admin or Celery beat schedule.
2. **Scrapy spider:** navigates target site, extracts structured data.
3. **Selenium fallback:** for JS-rendered content, Selenium browser extracts dynamic data.
4. **Pipeline:** items → Scrapy pipelines → Django models → PostgreSQL.
5. **API access:** DRF serves crawled content to frontend/external consumers.
6. **Admin management:** Django admin UI for crawled content & users.

Security notes: respect `robots.txt`, rate-limit, rotate user-agents, sanitize scraped data.

## Team

Git contributor statistics (`git shortlog -sn`):
- **Total contributors (local submodule):** 1
- **Contributor:** `rhixecompany <rhixecompany@gmail.com>` — 5 commits (100%)

> As with the others, the local git log records only workspace setup/maintenance by one author; the original upstream development lineage is not captured here.

## Evidence Appendix (git)

- `git rev-list --count HEAD` = **5** commits total (all within the last year).
- Commit dates span **2026-06-12 → 2026-07-16**, all authored by `rhixecompany`.
- Files present confirm a real, used scraping platform (committed `api.sqlite3`, `chapters.json`, `comics.json`, `geckodriver.exe`). The repo is explicitly flagged **legacy** with scraping consolidated into `rhixecompany-comics`.
