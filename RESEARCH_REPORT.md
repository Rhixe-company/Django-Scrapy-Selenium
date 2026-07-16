# RESEARCH_REPORT — Django-Scrapy-Selenium


**Stack:** Django 4.x, DRF, Scrapy, Selenium, Celery + Redis, PostgreSQL, Tailwind CSS 3, Node.js
**Status:** Active (legacy — scraping consolidated to rhixecompany-comics)

---

## 1. Database: PostgreSQL Performance & Connection Pooling

- **Django 5.1 native pooling** via `psycopg[pool]` — 50-70ms latency reduction (requires `CONN_MAX_AGE=0`)
- **Celery fix:** `connections.close_all()` in worker teardown
- **N+1 fix:** 4,000ms → 330ms with `select_related`/`prefetch_related`
- **Tuning:** `shared_buffers=25%RAM`, `work_mem=4-8MB`, `random_page_cost=1.1`

---

## 2. Django REST Framework — Optimization & Auth

- **Cursor pagination:** O(1) vs O(n) `COUNT(*)` on large datasets
- **Serializer:** avoid `SerializerMethodField`, never `fields='__all__'`
- **Caching:** `@cache_page` + Redis → 95-99% response time reduction
- **Auth:** SimpleJWT for APIs, SessionAuth for SPAs, Knox for per-device tokens

---

## 3. Scrapy + Selenium — Best Practices & Pitfalls

- **Playwright dominant** (2-3× faster, better stealth) — `scrapy-playwright` v0.0.47 (Jun 2026) uses the asyncio reactor by default (Scrapy 2.7+) and requires Playwright>=1.40; Scrapy 2.13+ prefers async `start()`
- **Scrapy + HTTPX** = 4× throughput vs `requests` for static content
- **Selenium 4.6+** has Selenium Manager built-in; W3C compliant
- **Key:** `CONCURRENT_REQUESTS=16`, `DOWNLOAD_DELAY=0.5`, `AUTOTHROTTLE_ENABLED`, `ROBOTSTXT_OBEY`
- **Pitfalls:** run spiders in Celery (not views), rotate UAs, sanitize data before ORM

---

## 4. Docker Compose — Full Stack Orchestration

- **Multi-stage builds** → 50-80% smaller images; layer caching → 80-95% faster rebuilds
- **Health checks** (`condition: service_healthy`) avoid startup races
- **Named volumes** for PostgreSQL + Redis; separate `docker-compose.prod.yml`
- **Celery concurrency:** max `CPU×2+1` for CPU-bound tasks

---

## 5. Redis — Beyond the Celery Broker

- **Cache:** `django-redis` + `HiredisParser` + `BlockingConnectionPool` (max 50)
- **Sessions:** `SESSION_ENGINE=cache` for stateless Redis-backed storage
- **Rate limiting:** sliding window via sorted sets
- **Task dedup:** `SETNX` lock prevents duplicate Celery executions
- **Channels:** `channels-redis` for real-time scraping progress
- **Tuning:** `allkeys-lru`, `save=""`, `tcp-keepalive=60`

---

## 6. Django Security Hardening

- **Critical:** `DEBUG=False`, `SECRET_KEY` from env, `ALLOWED_HOSTS`, `SECURE_SSL_REDIRECT`, HSTS 1yr
- **Cookies:** `SECURE=True`, `HTTPONLY=True`, `SAMESITE='Lax'`
- **Argon2** hasher, `django-axes` (5/1h), `django-csp` (start `REPORT_ONLY`)
- **Audit:** `manage.py check --deploy`, `pip-audit` in CI
- **Scraping:** sanitize data before ORM; never store credentials in spiders

---

## 7. Tailwind CSS + Django — Production Builds

- **Recommended:** `django-tailwind-cli` — `manage.py tailwind build`
- **Current:** standalone Tailwind CLI via npm scripts
- **Optimization:** `ManifestStaticFilesStorage` cache-busting; `--minify` + PurgeCSS → 3.5MB → ~10KB; avoid Play CDN

---

## 8. Node.js & TypeScript Scraping

- **Libs:** Playwright (JS-heavy), Puppeteer (Chrome), Axios+Cheerio (static)
- **Patterns:** `Promise.allSettled()` for batch isolation, `p-limit` for rate-limited concurrency
- **Integration:** `src/scrape.js` scrapers coordinate via Celery or webhook

---

## 9. Performance Cheatsheet

| Area | Technique | Gain |
|------|-----------|------|
| DB | N+1 fix | 10× query reduction |
| DB | Django 5.1 native pooling | 50-70ms latency drop |
| Cache | Redis backend | 95-99% speed |
| Scraping | Scrapy + HTTPX | 4× throughput |
| Scraping | Playwright vs Selenium | 2-3× faster |
| Celery | `task_acks_late=True` | Zero data loss |
| Docker | Multi-stage builds | 50-80% smaller |
| Frontend | Tailwind `--minify` | 3.5MB → ~10KB |

---

## 10. Security Cheatsheet

| Check | Severity |
|-------|----------|
| `DEBUG=False`, `SECRET_KEY` from env | Critical |
| `SECURE_SSL_REDIRECT`, HSTS 1yr | High |
| Secure cookies, Argon2, django-axes | High |
| Sanitize scraped data before ORM | High |
| `pip-audit` + `check --deploy` in CI | Medium |

---

## 11. Related Projects (workspace)

- **rhixecompany-comics** — consolidation target
- **selenium_webdriver** — shared browser automation
- **ecom** — shared Django + DRF patterns
- **cookiecutter-django-tailwind** — shared Django conventions

---

## 12. Key Resources

- [Scrapy + Playwright](https://github.com/scrapy-plugins/scrapy-playwright)
- [Selenium 4 Docs](https://www.selenium.dev/documentation)
- [Django 5.1 Pooling](https://docs.djangoproject.com/en/5.1/releases/5.1/)
- [Celery + Django](https://docs.celeryq.dev/en/stable/django)
- [Security Checklist](https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/)

**Methodology:** Web search + docs extraction. Last verified: 2026-07-16.
## Related Projects
