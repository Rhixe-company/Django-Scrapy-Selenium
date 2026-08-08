# REPOSITORY_SUMMARY.md

# Django-Scrapy-Selenium — Web Scraping Platform

**Generated:** 2026-07-25  
**Status:** Maintenance (Consolidation Target)  
**Path:** `projects/Django-Scrapy-Selenium/`

---

## Architecture

| Property      | Value                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| **Type**      | Django-based scraping platform                                                 |
| **Pattern**   | Django monolith with Scrapy spiders + Selenium automation + Celery async tasks |
| **Reference** | [Workflow Analysis](../docs/Project_Architecture/Workflow_Analysis.md)         |

Combines multiple scraping approaches: Scrapy spiders, Selenium browser automation, Node.js scripts — orchestrated via Celery.

---

## Technology Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Backend**  | Python 3.10+, Django 4.x, Django REST Framework |
| **Scraping** | Scrapy, Selenium, BeautifulSoup4                |
| **Async**    | Celery + Redis/RabbitMQ                         |
| **Database** | PostgreSQL (prod), SQLite (dev)                 |
| **Frontend** | Node.js (Selenium scripts in `src/`)            |
| **Infra**    | Docker Compose, Gunicorn                        |

---

## Project Structure

```
Django-Scrapy-Selenium/
├── config/                    # Django settings
├── api/                       # DRF API
├── apps/
│   ├── scrapers/             # Scrapy spiders
│   ├── selenium_tasks/       # Selenium automation
│   └── core/                 # Shared utilities
├── src/                       # Node.js scripts
│   └── scrape.js             # Selenium WebDriver scraper
├── requirements/
│   ├── production.txt
│   └── base.txt
├── pyproject.toml
└── docker-compose.yml
```

---

## Commands

```bash
pip install -r requirements.txt && bun install
python manage.py migrate && python manage.py runserver
celery -A config worker -l info
scrapy crawl spider_name
node src/scrape.js
pytest && bun run test
```

---

## Production

```bash
python manage.py collectstatic
gunicorn config.wsgi:application --bind 0.0.0.0:8000
docker compose up -d
bun run build
```

---

## Conventions

- Scraping logic consolidated into `rhixecompany-comics` for newer work
- Respect `robots.txt`, rate limit, rotate user-agents
- Celery tasks in dedicated `tasks.py` per app
- Separate settings per environment

---

## Consolidation

**P1 Target:** Merge into `rhixecompany-comics/backend/apps/scrapers/`

| Component       | Destination                               |
| --------------- | ----------------------------------------- |
| Scrapy spiders  | `backend/apps/scrapers/spiders/`          |
| Selenium utils  | `backend/apps/scrapers/selenium_utils.py` |
| Celery tasks    | `backend/apps/scrapers/tasks.py`          |
| Node.js scraper | Rewrite in Python (delete Node dep)       |

---

## CI/CD

**Workflow:** `.github/workflows/django-scrapy-selenium-ci.yml`  
**Jobs:** Python lint/test + Node.js build/test
