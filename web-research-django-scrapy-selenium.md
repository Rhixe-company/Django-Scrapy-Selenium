# Web Research — Django-Scrapy-Selenium

> **Type:** Web research compilation | **Generated:** 2026-07-16 | **Sources:** web_search + web_extract
> **Tech Stack:** PostgreSQL, Node, JavaScript, Scrapy, DRF, Python, Redis, TypeScript, Selenium, Django, SQLite, Docker, Tailwind

---

## Table of Contents

1. [Database: PostgreSQL Performance & Connection Pooling](#1-database-postgresql-performance--connection-pooling)
2. [Django REST Framework (DRF) — Performance & Security](#2-django-rest-framework-drf--performance--security)
3. [Scrapy + Selenium — Best Practices & Pitfalls](#3-scrapy--selenium--best-practices--pitfalls)
4. [Docker Compose — Django + Celery + Redis + PostgreSQL](#4-docker-compose--django--celery--redis--postgresql)
5. [Redis — Beyond the Celery Broker](#5-redis--beyond-the-celery-broker)
6. [Django Security Hardening](#6-django-security-hardening)
7. [Tailwind CSS + Django — Production Builds](#7-tailwind-css--django--production-builds)
8. [Node.js & TypeScript Scraping](#8-nodejs--typescript-scraping)
9. [Performance Cheatsheet](#9-performance-cheatsheet)
10. [Security Cheatsheet](#10-security-cheatsheet)
11. [Resources & References](#11-resources--references)

---

## 1. Database: PostgreSQL Performance & Connection Pooling

### Django 5.1+ Native Connection Pooling

**Django 5.1** (released August 2024) introduced native PostgreSQL connection pooling via psycopg — eliminating the need for PgBouncer in many setups.

**Benchmarks:**
- **Latency Reduction:** 50-70ms per request (especially significant on cloud databases like AWS RDS)
- **Connection Overhead:** 60-80% reduction
- **Response Time Improvement:** 10-30% on database-heavy views

**Setup:**
```python
pip install "psycopg[binary,pool]"

# settings.py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "your_db_name",
        "USER": "your_db_user",
        "PASSWORD": "your_db_password",
        "HOST": "your_db_host",
        "PORT": "5432",
        "CONN_MAX_AGE": 0,  # REQUIRED for pooling
        "OPTIONS": {
            "pool": {
                "min_size": 4,      # Warm connections
                "max_size": 16,     # Traffic spikes
                "timeout": 10,      # Fail fast under load
                "max_lifetime": 1800,  # 30 min max connection age
                "max_idle": 300,    # Close idle after 5 min
            }
        },
    }
}
```

**Critical:** `CONN_MAX_AGE` must be `0` — pooling manages lifetime, making Django's persistence redundant. Without this, Django throws `ImproperlyConfigured`.

### Celery + Connection Pooling

Pooling creates connection leaks in threaded code. Add explicit cleanup:

```python
# Celery worker cleanup
from django.db import connections

def cleanup_connections():
    connections.close_all()
```

### PostgreSQL Parameter Tuning (2025 Best Practices)

| Parameter | Recommendation | Rationale |
|-----------|---------------|-----------|
| `shared_buffers` | 25% of RAM | Primary cache; too high = OS double-caching |
| `effective_cache_size` | 75% of RAM | Planner cost estimate |
| `work_mem` | 4-8MB per sort | Per-operation; too high = OOM with many connections |
| `maintenance_work_mem` | 256-512MB | Autovacuum, index creation |
| `random_page_cost` | 1.1 (SSD) or 4.0 (HDD) | Lower = index scans preferred |
| `max_connections` | 20-50 for app tier | Use pgbouncer or pooler instead of raising this |
| `autovacuum` | ON (default) | Prevent transaction ID wrap-around |

### N+1 Query Fix (10x Performance Win)

The single most impactful Django optimization:

```python
# BAD: Triggers N+1 queries
courses = Course.objects.all()
for course in courses:
    print(course.instructor.name)  # Database hit each iteration

# GOOD: 2-3 queries regardless of count
courses = Course.objects.select_related('instructor').prefetch_related('tags')
```

- **select_related:** ForeignKey, OneToOne (SQL JOIN)
- **prefetch_related:** ManyToMany, reverse FK (separate query + Python join)
- **Benchmark:** 4,000ms → 330ms (10x improvement)

### SQLite vs PostgreSQL in Dev/Prod

| Aspect | SQLite (Dev) | PostgreSQL (Prod) |
|--------|-------------|-------------------|
| **Concurrency** | Single-writer lock | Full MVCC |
| **Data integrity** | Limited | Full ACID + constraints |
| **JSON fields** | Basic | Advanced (`JSONB`, indexing) |
| **Full-text search** | Limited FTS5 | `tsvector`/`tsquery` |
| **Migrations** | May differ in SQL | Production source of truth |
| **Connection pooling** | None needed | Essential (native or PgBouncer) |

**Best Practice:** Use PostgreSQL even in dev via Docker Compose to avoid migration surprises.

---

## 2. Django REST Framework (DRF) — Performance & Security

### Performance Optimization

**1. Cursor-based pagination for large datasets:**
```python
from rest_framework.pagination import CursorPagination

class OptimizedCursorPagination(CursorPagination):
    page_size = 100
    ordering = '-created'  # Must be unique, indexed field
```
- Default `PageNumberPagination` runs `COUNT(*)` on every request — expensive for millions of rows
- Cursor pagination is O(1) per page and works with infinite scroll

**2. Select related / prefetch related in viewsets:**
```python
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related('instructor').prefetch_related('students')
    serializer_class = CourseSerializer
```

**3. Caching with Django's cache framework + Redis:**
```python
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# View-level caching
@cache_page(60 * 15)  # 15 minutes
def my_view(request):
    ...

# Low-level caching
def get_expensive_data():
    key = 'expensive_data'
    result = cache.get(key)
    if not result:
        result = compute_expensive_value()
        cache.set(key, result, 300)  # 5 min TTL
    return result
```
- **Cache hit impact:** 95-99% response time reduction
- Redis as cache backend: `pip install django-redis`

**4. Serializer optimization:**
- Use `SerializerMethodField` sparingly (evaluates per-object)
- Use `read_only_fields` for computed/joined data
- Use `ModelSerializer` with `depth` or explicit fields, never `fields = '__all__'`

**5. Throttling/Rate Limiting:**
```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    }
}
```
- Uses Django's cache framework (configure Redis for production)
- **Important:** Built-in throttling is an application-level policy, NOT a security measure — malicious actors can spoof IPs

### DRF Authentication — Trade-offs

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **SessionAuth + CSRF** | Built-in, cookie-based | Not stateless, CSRF tokens needed | Browser SPAs |
| **TokenAuthentication** | Simple, stateless | No expiry built-in, server-stored tokens | Mobile apps |
| **SimpleJWT (Access + Refresh)** | Stateless, refresh pattern | Revocation needs blacklist | High-traffic APIs |
| **django-rest-framework-api-key** | Hashed keys, scoped | Server-stored, extra package | Third-party integrations |
| **django-rest-knox** | Per-device, auto-expiry | DB-backed | Per-device token management |

---

## 3. Scrapy + Selenium — Best Practices & Pitfalls

### Scrapy Best Practices

**1. Concurrency tuning:**
```python
# settings.py
CONCURRENT_REQUESTS = 16          # Default: 16
CONCURRENT_REQUESTS_PER_DOMAIN = 8
DOWNLOAD_DELAY = 0.5              # Respect rate limits
RANDOMIZE_DOWNLOAD_DELAY = True
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 1.0
AUTOTHROTTLE_MAX_DELAY = 10.0
```

**2. Middleware order (2024+ best practice):**
```python
DOWNLOADER_MIDDLEWARES = {
    'scrapy.downloadermiddlewares.retry.RetryMiddleware': 350,
    'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 400,
    'scrapy_fake_useragent.middleware.RandomUserAgentMiddleware': 400,
    'scrapy_selenium.SeleniumMiddleware': 800,  # Last for JS pages
}
```

**3. Scrapy + HTTPX** for static crawling:
- 4× throughput vs `requests` library
- Async support via `scrapy_async_httpx`
- Preferred for high-volume static content

**4. Selenium via scrapy-selenium middleware:**
```python
from scrapy_selenium import SeleniumRequest

yield SeleniumRequest(
    url=url,
    callback=self.parse_result,
    wait_time=10,  # Explicit wait before returning
    screenshot=True,  # Capture screenshot in meta
)
```
- Selenium request has `driver` in `response.meta`
- The `selector` response attribute works as usual (contains JS-rendered HTML)

### Scrapy + Playwright (Modern Alternative)

- **Playwright is 2-3× faster and harder to detect** than Selenium
- **scrapy-playwright** integrates via `DOWNLOAD_HANDLERS`:
```python
DOWNLOAD_HANDLERS = {
    "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
    "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
}
```
- Hybrid approach: Scrapy for static pages, Playwright for JS interaction

### Common Scrapy Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Blocking web tier | Timeouts | Run spiders in Celery, not views |
| Duplicate task execution | Data duplication | `celery-once` + Redis lock |
| Selenium detection | Blocks/bans | Use Playwright for new scrapers; override `navigator.webdriver` |
| Missing `DOWNLOAD_DELAY` | IP bans | Always rate-limit, rotate user-agents |
| Ignoring `robots.txt` | Legal/infraction risk | Respect `ROBOTSTXT_OBEY` |
| Not rotating user agents | Detection | `scrapy-fake-useragent` middleware |
| Not sanitizing scraped data | XSS in storage | Always clean/validate before storing |
| Missing retry middleware | Lost data | Enable RetryMiddleware with proper retry codes |

### Selenium 4 Specifics (2024+)

- **Selenium 4.6+** includes Selenium Manager — no need for `webdriver-manager`
- W3C WebDriver compliant by default
- **Detection vectors:** `navigator.webdriver=true`, `chrome.runtime`, headless fingerprints
- **Stealth workarounds:** Use `undetected-chromedriver` or Playwright for production
- **Selenium Grid 4** supports distributed execution with dynamic node scaling

---

## 4. Docker Compose — Django + Celery + Redis + PostgreSQL

### Production-Grade Multi-Stage Setup

**Dockerfile structure:**
```dockerfile
# Stage 1: Build dependencies
FROM python:3.12-slim AS builder
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.12-slim
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
WORKDIR /app
COPY . .
RUN SECRET_KEY=build-key python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
```

**docker-compose.yml for development:**
```yaml
services:
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myproject
      POSTGRES_USER: django
      POSTGRES_PASSWORD: djangopass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U django -d myproject"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app  # Live reload
    ports:
      - "8000:8000"
    environment:
      DEBUG: "true"
      DATABASE_URL: postgres://django:djangopass@db:5432/myproject
      CELERY_BROKER_URL: redis://redis:6379/0
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }

  celery-worker:
    build: .
    command: celery -A config worker -l info --concurrency=2
    volumes:
      - .:/app
    environment:
      DATABASE_URL: postgres://django:djangopass@db:5432/myproject
      CELERY_BROKER_URL: redis://redis:6379/0
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }

  celery-beat:
    build: .
    command: celery -A config beat -l info
    volumes:
      - .:/app
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }

volumes:
  pgdata:
  redisdata:
```

### Docker Compose Best Practices

1. **Health checks:** Always use `depends_on: condition: service_healthy` — avoids race conditions on startup
2. **Named volumes** for persistent data (PostgreSQL, Redis) — survive container restarts
3. **Layer caching:** Install requirements before copying source code for faster rebuilds
4. **Separate Compose files:** `docker-compose.yml` (dev) + `docker-compose.prod.yml` (production overrides)
5. **Environment files:** Use `.env` files or `django-environ` to inject secrets
6. **Celery task registration:** After adding new `@shared_task` tasks, rebuild containers — Celery registers tasks on startup
7. **Multi-stage builds** dramatically reduce final image size (omit build tooling)
8. **Never run `--concurrency` > CPU count * 2 + 1** for CPU-bound scraping tasks

---

## 5. Redis — Beyond the Celery Broker

### Redis as a Django Swiss Army Knife

**1. Cache Backend:**
```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PARSER_CLASS': 'redis.connection.HiredisParser',
            'CONNECTION_POOL_CLASS': 'redis.BlockingConnectionPool',
            'CONNECTION_POOL_CLASS_KWARGS': {
                'max_connections': 50,
                'timeout': 20,
            }
        }
    }
}
```

**2. Session Storage:**
```python
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
```

**3. Rate Limiting (Sliding Window):**
```python
import time
import redis

r = redis.Redis(host='redis', port=6379, db=2)

def is_rate_limited(key, max_requests=10, window_seconds=60):
    """Sliding window rate limiter using sorted sets."""
    now = time.time()
    window_start = now - window_seconds
    pipeline = r.pipeline()
    pipeline.zremrangebyscore(key, 0, window_start)  # Clean old entries
    pipeline.zcard(key)  # Count current window
    pipeline.zadd(key, {str(now): now})  # Add current request
    pipeline.expire(key, window_seconds)  # Auto-cleanup
    _, count, _, _ = pipeline.execute()
    return count > max_requests
```

**4. Task Deduplication (celery-once pattern):**
```python
from celery import Task
from redis import StrictRedis

class DedupByURITask(Task):
    abstract = True
    redis_instance = StrictRedis(host='redis', db=3)

    def apply_async(self, args=None, kwargs=None, **options):
        lock_key = f"task_lock:{self.name}:{args}:{kwargs}"
        lock = self.redis_instance.setnx(lock_key, 1)
        if lock:
            self.redis_instance.expire(lock_key, 3600)  # 1 hour lock
            return super().apply_async(args=args, kwargs=kwargs, **options)
        return None  # Duplicate skipped
```

**5. Real-time Django Channels:**
```python
# requirements: channels, channels-redis
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {"hosts": [("redis", 6379)]},
    },
}
```

### Redis Performance Tuning

| Setting | Recommendation | Notes |
|---------|---------------|-------|
| `maxmemory-policy` | `allkeys-lru` | For cache use-cases |
| `save` | `""` (disable) | For ephemeral cache — no persistence needed |
| `tcp-keepalive` | `60` | Detect dead connections faster |
| `timeout` | `300` | Close idle connections after 5 min |
| `maxclients` | `1000` | Default is fine for most setups |

---

## 6. Django Security Hardening

### Production Deployment Checklist

**Critical settings:**
```python
# Must be set before deployment
DEBUG = False
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']  # Never hardcode
ALLOWED_HOSTS = ['yourdomain.com']

SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'

X_FRAME_OPTIONS = 'DENY'         # Clickjacking protection
SECURE_CONTENT_TYPE_NOSNIFF = True  # MIME-sniffing prevention
SECURE_BROWSER_XSS_FILTER = True    # Legacy XSS filter
```

**Password hardening:**
```python
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': '...UserAttributeSimilarityValidator'},
    {'NAME': '...MinimumLengthValidator', 'OPTIONS': {'min_length': 12}},
    {'NAME': '...CommonPasswordValidator'},
    {'NAME': '...NumericPasswordValidator'},
]

# Use Argon2 (install django[argon2])
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
]
```

**Brute-force protection with django-axes:**
```python
INSTALLED_APPS += ['axes']
AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',
    'django.contrib.auth.backends.ModelBackend',
]
AXES_FAILURE_LIMIT = 5
AXES_COOLOFF_TIME = 1  # hours
```

**CSP (Content Security Policy) via django-csp:**
```python
pip install django-csp

MIDDLEWARE += ['csp.middleware.CSPMiddleware']

CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'",)
CSP_STYLE_SRC = ("'self'", 'https://fonts.googleapis.com')
CSP_IMG_SRC = ("'self'", 'data:', 'https:')
CSP_REPORT_ONLY = True  # Switch to False after testing
```

**Dependency auditing:**
```bash
python manage.py check --deploy
pip-audit                # Audit Python dependencies
safety check             # Alternative dependency scanner
```

### Scraping-Specific Security Concerns

1. **Never store credentials in spiders** — use Django settings modules with `os.environ`
2. **Scraping pipelines must sanitize data** before ORM storage (XSS, injection)
3. **Rate limit webhook callbacks** — protect against replay attacks
4. **Proxy rotation** for large-scale scraping to avoid IP bans
5. **User-agent rotation** via `Scrapy-Fake-Useragent` middleware

---

## 7. Tailwind CSS + Django — Production Builds

### Integration Patterns

**Option 1: django-tailwind-cli (Recommended)**
```
pip install django-tailwind-cli
python manage.py tailwind init
python manage.py tailwind install
python manage.py tailwind start    # Dev watch mode
python manage.py tailwind build    # Production build
```

**Option 2: Standalone Tailwind CLI + Webpack (project's current setup)**
```json
{
  "scripts": {
    "dev": "tailwindcss -i ./static/src/input.css -o ./static/css/output.css --watch",
    "build": "tailwindcss -i ./static/src/input.css -o ./static/css/output.css --minify"
  }
}
```

### Cache-Busting with ManifestStaticFilesStorage

```python
# settings.py
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
```

- Django hashes static files (e.g., `tailwind.4e3e58f1a4a4.css`)
- Ensure `css/source.css` is NOT processed by ManifestStaticFilesStorage
- Run `python manage.py collectstatic` during deployment

### Production Build Optimization

| Technique | Benefit |
|-----------|---------|
| `--minify` flag | 85%+ size reduction (50KB vs 3.5MB) |
| `@tailwindcss/typography` | Prose styling without custom CSS |
| Purge CSS (built-in) | Only includes used classes (~10KB final) |
| Brotli compression | Additional 20-30% over gzip |
| `cssnano` in PostCSS | Further minification |
| CDN cache for static assets | Global edge delivery |

**Important:** Never use Tailwind Play CDN in production — it's 3.5MB+ and runs browser-side compilation.

---

## 8. Node.js & TypeScript Scraping

### Node.js Scraping Libraries (2025-2026)

| Library | Use Case | Notes |
|---------|----------|-------|
| **Playwright** | JS-heavy page interaction | 2-3× faster than Selenium, async-native |
| **Puppeteer** | Chrome-only automation | Standard for many Node.js scrapers |
| **Axios + Cheerio** | Static HTML parsing | Lightweight, fast for simple pages |
| **Node-fetch / Axios** | HTTP requests | Modern replacement for `request` library |

### TypeScript Scraping Patterns

**Basic TypeScript scraper with Axios + Cheerio:**
```typescript
import axios from 'axios';
import * as cheerio from 'cheerio';

interface ProductData {
  title: string;
  price: number;
  description: string;
}

async function scrapeProductPage(url: string): Promise<ProductData> {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  return {
    title: $('h1.product-name').text().trim(),
    price: parseFloat($('.price').text().replace('$', '')),
    description: $('.description').text().trim(),
  };
}
```

**TypeScript + Playwright for JS-rendered pages:**
```typescript
import { chromium } from 'playwright';

async function scrapeDynamicPage(url: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  
  const data = await page.evaluate(() => {
    return {
      title: document.querySelector('h1')?.textContent,
      items: Array.from(document.querySelectorAll('.item')).map(el => el.textContent),
    };
  });
  
  await browser.close();
  return data;
}
```

**Concurrency with TypeScript:**
- Use `Promise.allSettled()` for batch scraping (error isolation)
- Use `p-limit` package for rate-limited concurrency
- Use `ts-node` or `tsx` for running TypeScript directly

---

## 9. Performance Cheatsheet

| Area | Technique | Expected Gain |
|------|-----------|---------------|
| **Database** | N+1 fix with `select_related`/`prefetch_related` | 10x query reduction |
| **Database** | Django 5.1 native connection pooling | 50-70ms latency reduction |
| **Database** | PostgreSQL index on queried columns | 10-100x on filtered queries |
| **Database** | Cursor pagination (vs page number) | O(1) vs O(n) on `COUNT(*)` |
| **Cache** | Redis cache backend | 95-99% response time for cacheable views |
| **Cache** | `@cache_page` decorator | Instant for cached pages |
| **Scraping** | Scrapy + HTTPX (vs requests) | 4× throughput |
| **Scraping** | Playwright (vs Selenium) | 2-3× faster, better stealth |
| **Scraping** | Autothrottle + concurrent requests | Maximizes throughput while avoiding bans |
| **Celery** | `--concurrency=CPU*2+1` (I/O bound) | Optimal worker utilization |
| **Celery** | `task_acks_late=True` | Zero data loss on worker crash |
| **Django** | ASGI vs WSGI (I/O-bound) | 6,252 RPS vs 4,000 RPS |
| **Docker** | Multi-stage builds | 50-80% smaller images |
| **Docker** | Layer caching (deps before source) | 80-95% faster rebuilds |
| **Frontend** | Tailwind `--minify` + PurgeCSS | 3.5MB → ~10KB CSS |
| **Frontend** | Django ManifestStaticFilesStorage | Fast CDN cache-busting |

---

## 10. Security Cheatsheet

| Category | Check | Severity |
|----------|-------|----------|
| **Config** | `DEBUG=False` in production | Critical |
| **Config** | `SECRET_KEY` from env, not code | Critical |
| **Config** | `ALLOWED_HOSTS` configured | Critical |
| **HTTPS** | `SECURE_SSL_REDIRECT = True` | High |
| **HTTPS** | `SECURE_HSTS_SECONDS = 31536000` | High |
| **Cookies** | `SESSION_COOKIE_SECURE = True` | High |
| **Cookies** | `CSRF_COOKIE_SECURE = True` | High |
| **Cookies** | `SESSION_COOKIE_HTTPONLY = True` | Medium |
| **Clickjack** | `X_FRAME_OPTIONS = 'DENY'` | Medium |
| **CSP** | Content Security Policy header | Medium |
| **Passwords** | Argon2 hasher, min 12 chars | High |
| **Auth** | django-axes (5 attempts, 1h cooldown) | High |
| **Scraping** | Respect `robots.txt` + rate limits | Legal/Operational |
| **Scraping** | Sanitize scraped data before ORM | High (XSS prevention) |
| **Deps** | `manage.py check --deploy` | Medium |
| **Deps** | `pip-audit` in CI pipeline | Medium |

---

## 11. Resources & References

### Database & Django Performance
- [Django 5.1 Native Connection Pooling](https://docs.djangoproject.com/en/5.1/releases/5.1/)
- [Django Database Configuration](https://docs.djangoproject.com/en/5.2/ref/databases/)
- [Django Performance Optimization Guide](https://djangocfg.com/updates/blog/django-performance-optimization-guide)
- [PostgreSQL Parameter Tuning Best Practices 2025](https://www.mydbops.com/blog/postgresql-parameter-tuning-best-practices)

### DRF
- [DRF Throttling Guide](https://www.django-rest-framework.org/api-guide/throttling/)
- [Optimizing DRF for Large Data Sets](https://reintech.io/blog/optimizing-django-rest-framework-large-data-sets)
- [How to Optimize Django REST APIs](https://www.freecodecamp.org/news/how-to-optimize-django-rest-apis-for-performance)

### Scrapy & Selenium
- [scrapy-selenium on GitHub](https://github.com/clemfromspace/scrapy-selenium)
- [scrapy-playwright integration](https://github.com/scrapy-plugins/scrapy-playwright)
- [Scrapy Settings Reference](https://docs.scrapy.org/en/latest/topics/settings.html)
- [Selenium 4 Documentation](https://www.selenium.dev/documentation/)

### Docker
- [Django + PostgreSQL + Redis Docker Compose Guide](https://oneuptime.com/blog/post/2026-02-08-how-to-set-up-a-django-postgresql-redis-stack-with-docker-compose/view)
- [Django-Docker-Compose-Celery-Redis-PostgreSQL](https://github.com/runitrupam/Django-Docker-Compose-Celery-Redis-PostgreSQL)
- [Docker Compose Django PostgreSQL Redis Example](https://github.com/pahaz/docker-compose-django-postgresql-redis-example)

### Redis
- [How to Use Redis with Django](https://oneuptime.com/blog/post/2026-01-21-redis-django-integration/view)
- [Redis Rate Limiting Patterns](https://redis.io/glossary/rate-limiting/)
- [Redis-Powered Django APIs](https://medium.com/@anas-issath/redis-powered-django-apis-the-architecture-that-handles-millions-9eac75c79d2a)

### Security
- [Django Deployment Checklist](https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/)
- [Django Security Checklist 2026](https://zeriflow.com/blog/django-security-checklist/)
- [Django Security Best Practices](https://learndjango.com/tutorials/django-best-practices-security)
- [API Security in Django](https://dev.to/topunix/api-security-in-django-approaches-trade-offs-and-best-practices-nk4)
- [OWASP Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

### Tailwind + Django
- [Tailwind CSS Production Optimization](https://tailwindcss.com/docs/optimizing-for-production)
- [Django + Tailwind Cache-Busting](https://www.loopwerk.io/articles/2025/django-tailwind-production/)
- [django-tailwind-cli](https://pypi.org/project/django-tailwind-cli/)

### Node.js/TypeScript Scraping
- [Web Scraping with TypeScript and Node.js](https://www.thisdot.co/blog/web-scraping-with-typescript-and-node-js)
- [Advanced TypeScript Web Scraping](https://scrape.do/blog/advanced-typescript-web-scraping/)
- [Web Scraping with JavaScript and Node.js 2026](https://brightdata.com/blog/how-tos/web-scraping-with-node-js)

---

*Generated via web-research-pipeline — 5 searches, 5 page extractions, compiled 2026-07-16*
