# The Story of Django-Scrapy-Selenium

*The platform that tried to do everything, and taught us to do one thing well*

---

## Prologue: The Kitchen Sink

January 2024. The requirement: "Build a scraping platform."

The implementation: **Everything.**

- Django for the web layer
- Scrapy for structured crawling
- Selenium for JavaScript-heavy sites
- Celery for async tasks
- Node.js scripts for... more Selenium (because the Python one was "too slow")
- Tailwind dashboard for monitoring
- Redis + RabbitMQ (both, "just in case")

The commit message: `feat: initial scraping platform with all engines`

---

## Chapter 1: The Three Engines

### Engine 1: Scrapy (The Structured One)
```python
# apps/scrapers/spiders/comic_spider.py
class ComicSpider(scrapy.Spider):
    name = 'comic'
    start_urls = ['https://example.com/comics']
    
    def parse(self, response):
        for comic in response.css('.comic-item'):
            yield {
                'title': comic.css('h3::text').get(),
                'url': comic.css('a::attr(href)').get(),
            }
```
Clean. Fast. Handles thousands of pages. **But** — no JavaScript.

### Engine 2: Selenium via Python (The Browser One)
```python
# apps/scrapers/selenium_utils.py
def scrape_with_selenium(url):
    driver = get_driver()
    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.dynamic-content'))
        )
        return driver.page_source
    finally:
        driver.quit()
```
Renders JavaScript. Slow. Memory leaks. **But** — works on SPAs.

### Engine 3: Selenium via Node.js (The Other Browser One)
```javascript
// src/scrape.js
const {Builder, By, until} = require('selenium-webdriver');

async function scrape(url) {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url);
    await driver.wait(until.elementLocated(By.css('.dynamic-content')), 10000);
    return await driver.getPageSource();
  } finally {
    await driver.quit();
  }
}
```
**Why two Selenium implementations?** The Python one had memory leaks after 50 pages. The Node one "felt more stable." Now there were two to maintain.

---

## Chapter 2: The Orchestration Layer

Celery was supposed to unite them:

```python
# apps/tasks/tasks.py
@shared_task
def run_scrapy_spider(spider_name):
    subprocess.run(['scrapy', 'crawl', spider_name])

@shared_task
def run_selenium_python(url):
    return scrape_with_selenium(url)

@shared_task
def run_selenium_node(url):
    result = subprocess.run(['node', 'src/scrape.js', url], capture_output=True)
    return result.stdout
```

**The problems:**
- Three different error handling patterns
- Three different logging formats
- Three different retry strategies
- Celery Beat scheduling became a maze of crontab expressions
- Monitoring: "Is the Scrapy task stuck or just slow?"

---

## Chapter 3: The Dashboard That Monitored Chaos

Tailwind + Alpine.js dashboard showing:
- Active Celery workers
- Task queue depth per engine
- Success/failure rates
- Last run timestamps
- Manual "retry" buttons

It was beautiful. It showed exactly how broken everything was.

---

## Chapter 4: The Consolidation Decision

July 2025. Three comic projects exist:
- `comicwise` — Next.js + Prisma
- `rhixe_scans` — Next.js + Prisma  
- `rhixecompany-comics` — Django + Next.js (the survivor)

`Django-Scrapy-Selenium` is the **scraping engine** for all of them. But it's a mess.

**P1 Priority:** Merge into `rhixecompany-comics/backend/apps/scrapers/`

| Component | Destination | Effort |
|-----------|-------------|--------|
| Scrapy spiders | `backend/apps/scrapers/spiders/` | Low |
| Selenium utils (Python) | `backend/apps/scrapers/selenium_utils.py` | Low |
| Node.js scraper | **DELETE** (rewrite in Python) | Medium |
| Celery tasks | `backend/apps/scrapers/tasks.py` | Low |
| Dashboard | `frontend/app/admin/scraping/` | Medium |

**The Node.js Selenium code gets deleted.** One language, one Selenium implementation.

---

## Chapter 5: What We Learned

| Anti-Pattern | Lesson |
|--------------|--------|
| **Three scraping engines** | Pick one primary. Add second only when first provably fails. |
| **Polyglot scraping** | One language per service. Python for scraping, not Python + Node. |
| **Celery without observability** | Add structured logging, metrics, alerting *before* scaling tasks. |
| **Duplicate infrastructure** | Redis + RabbitMQ = confusion. Pick one broker. |
| **No integration tests** | Scrapers break when sites change. Test with recorded HTML fixtures. |

---

## Epilogue: The Engine That Survives

The Scrapy spiders? They'll live on. Clean, fast, reliable.

The Python Selenium utils? They'll live on. Refactored, typed, tested.

The Node.js scraper? **Deleted.** Its 300 lines replaced by 50 Python lines.

The Celery tasks? Refactored into a single `ScraperTask` base class with engine-agnostic retry logic.

The dashboard? Rebuilt in the `rhixecompany-comics` admin panel.

**The kitchen sink is gone. The faucet works perfectly.**

---

*Written by the workspace chronicler, July 25, 2025.  
Filed at `projects/Django-Scrapy-Selenium/THE_STORY_OF_THIS_REPO.md`.*