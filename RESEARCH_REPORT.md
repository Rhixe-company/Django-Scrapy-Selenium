# RESEARCH_REPORT — Django-Scrapy-Selenium

> **Type:** Project research report | **Updated:** 2026-07-16

**Type:** Django-based web scraping platform
**Tech Stack:** Django 4.x, DRF, Scrapy, Selenium, BeautifulSoup4, Celery + Redis/RabbitMQ, PostgreSQL, Webpack 5, Tailwind CSS 3, Alpine.js, htmx
**Status:** Active (legacy — scraping consolidated to rhixecompany-comics)

---

## Similar Projects

| Project | Relevance |
|---------|-----------|
| codingforentrepreneurs/Web-Scraping-with-Django-Celery | Django + Celery scraping scheduler |
| scrapy-plugins/scrapy-playwright | Official Scrapy + Playwright integration |

---

## Key Findings

### Scrapy + Playwright (2026)
- **Playwright is dominant** for JS-rendered content: auto-wait, native CDP, multi-browser
- **Scrapy + HTTPX** remains strongest for high-volume static crawling (4× throughput vs requests)
- **Scrapy 2.13+** introduces `async def start()` — first-class async support
- **Hybrid approach recommended**: Scrapy for static pages, Playwright for JS interaction
- **scrapy-playwright** integrates via `DOWNLOAD_HANDLERS` config, keeps Scrapy pipeline intact

### Django + Celery Scraping Integration
- Scrapy spiders best called from Celery tasks, not coupled to Django views
- **Critical settings**: `task_acks_late=True`, `task_reject_on_worker_lost=True`, `worker_prefetch_multiplier=1`
- **Queue separation**: dedicated queues for high-priority vs bulk scraping
- **`django-celery-beat`** for DB-backed periodic tasks — enables Django Admin scheduling
- **`celery-once` with Redis lock** prevents duplicate execution from retries

### Selenium 4.x vs Modern Alternatives
- Selenium 4 is W3C WebDriver compliant, mature Grid 4
- **Selenium Manager (4.6+)** replaces `webdriver-manager` — built-in, zero-config
- **Playwright is 2-3× faster and harder to detect** — recommended for new scrapers
- Detection vectors: `navigator.webdriver`, UA inconsistencies — override via CDP

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Scrapy + Playwright | <https://github.com/scrapy-plugins/scrapy-playwright> | Integration |
| Django Celery Beat | <https://django-celery-beat.readthedocs.io> | Docs |
| Selenium 4 Manager | <https://www.selenium.dev/documentation/webdriver/drivers/manager> | Guide |

---

## Best Practices

1. **Scrapy for static, Playwright for JS** — hybrid approach maximizes throughput
2. **Celery task isolation** — one spider per task; never couple to views
3. **Queue separation** — dedicated queues for high-priority vs bulk scraping
4. **Idempotent webhook handling** — use Redis lock + idempotency keys
5. **Django ORM in Scrapy pipelines** — call `django.setup()` in spider settings

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Blocking the web tier | Timeouts | Run scrapers in Celery, not views |
| Duplicate task execution | Data duplication | `celery-once` + Redis lock |
| Selenium detection | Blocks/bans | Use Playwright for new scrapers |
| Missing Celery ack_late | Lost tasks on crash | `task_acks_late=True` in settings |

---

## Performance

1. **Scrapy + HTTPX hybrid** — static crawls at 4× requests throughput
2. **Celery concurrency** — `--concurrency=CPU*2+1` for I/O-bound scraping workloads
3. **Playwright for JS pages** — 2-3× faster than Selenium with better stealth
4. **Visibility timeout** — `broker_transport_options = {'visibility_timeout': 3600}` for long tasks
5. **Connection pooling** — `CONN_MAX_AGE` or pgbouncer for PostgreSQL

---

## Security

1. **Scrapy download delays** — `DOWNLOAD_DELAY` + `RANDOMIZE_DOWNLOAD_DELAY` to avoid detection
2. **Rotate user agents** — `Scrapy-Fake-Useragent` middleware
3. **Proxy rotation** — for large-scale scraping to avoid IP bans
4. **Never store credentials in spiders** — use Django settings modules
5. **Rate limit webhook callbacks** — protect against replay attacks

---

## Related Projects (in workspace)

- **rhixecompany-comics** — consolidation target; shared Scrapy + Celery patterns
- **selenium_webdriver** — shared browser automation; Node.js Selenium alternative
- **ecom** — shared Django + DRF patterns
- **cookiecutter-django-tailwind** — shared Django architecture conventions
- **Python-projects** — shared Python scripting patterns

---

## Resources

| Resource | URL |
|----------|-----|
| Scrapy + Playwright | <https://github.com/scrapy-plugins/scrapy-playwright> |
| Celery Django | <https://docs.celeryq.dev/en/stable/django> |
| Selenium 4 | <https://www.selenium.dev/documentation> |

### Research Methodology
- **Web search:** web_search (2026 scraping patterns)
- **Documentation:** web_extract (Scrapy, Playwright, Selenium docs)
- **Tool comparison:** Selenium vs Playwright vs Puppeteer benchmarks
- **Last verified:** 2026-07-16
