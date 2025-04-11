# Scrapy settings for crawler project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html
import os
import sys
from pathlib import Path
from shutil import which

import django
from django.conf import settings
from scrapy.utils.reactor import install_reactor

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(os.path.join(BASE_DIR, "config"))  # noqa: PTH118
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
os.environ.setdefault("DJANGO_ALLOW_ASYNC_UNSAFE", "true")
django.setup()

BOT_NAME = "crawler"

SPIDER_MODULES = ["crawler.spiders"]
NEWSPIDER_MODULE = "crawler.spiders"


# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"  # noqa: E501

USER_AGENT_LIST = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",  # noqa: E501
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",  # noqa: E501
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",  # noqa: E501
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",  # noqa: E501
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",  # noqa: E501
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",  # noqa: E501
]


# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Configure maximum concurrent requests performed by Scrapy (default: 16)
CONCURRENT_REQUESTS = 128

# Configure a delay for requests for the same website (default: 0)
# See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
DOWNLOAD_DELAY = 0
# The download delay setting will honor only one of:
CONCURRENT_REQUESTS_PER_DOMAIN = 64
CONCURRENT_REQUESTS_PER_IP = 64

# Disable cookies (enabled by default)
# COOKIES_ENABLED = False  # noqa: ERA001

# Disable Telnet Console (enabled by default)
# TELNETCONSOLE_ENABLED = False  # noqa: ERA001

# Override the default request headers:
# DEFAULT_REQUEST_HEADERS = {  # noqa: ERA001, RUF100
#    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",  # noqa: E501, ERA001
#    "Accept-Language": "en",
# }  # noqa: ERA001, RUF100

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
# SPIDER_MIDDLEWARES = {  # noqa: ERA001, RUF100
#    "crawler.middlewares.CrawlerSpiderMiddleware": 543,
# }  # noqa: ERA001, RUF100

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
    "scrapy.downloadermiddlewares.useragent.UserAgentMiddleware": None,
    "crawler.middlewares.rotate.RotateUserAgentMiddleware": 540,
    # "crawler.middlewares.retry.TooManyRequestsRetryMiddleware": 541,
    # "crawler.middlewares.default.CrawlerDownloaderMiddleware": 543,
    "crawler.middlewares.main.SeleniumMiddleware": 800,
}

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
# EXTENSIONS = {  # noqa: ERA001, RUF100
#    "scrapy.extensions.telnet.TelnetConsole": None,
# }  # noqa: ERA001, RUF100

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    "crawler.pipelines.download_images.MyImagesPipeline": 1,
    "crawler.pipelines.default.CrawlerDefaultPipeline": 200,
    "crawler.pipelines.db.DbPipeline": 300,
    # "crawler.pipelines.redis.red.CrawlerRedisPipeline": 400,
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
# AUTOTHROTTLE_ENABLED = True  # noqa: ERA001
# The initial download delay
# AUTOTHROTTLE_START_DELAY = 5 # noqa: ERA001
# The maximum download delay to be set in case of high latencies
# AUTOTHROTTLE_MAX_DELAY = 60 # noqa: ERA001
# The average number of requests Scrapy should be sending in parallel to
# each remote server
# AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0 # noqa: ERA001
# Enable showing throttling stats for every response received:
# AUTOTHROTTLE_DEBUG = False # noqa: ERA001

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 86400
HTTPCACHE_DIR = "cache"
HTTPCACHE_IGNORE_HTTP_CODES = list(range(300, 501))
HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"
HTTPCACHE_GZIP = True
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
# Set settings whose default value is deprecated to a future-proof value
TWISTED_REACTOR = install_reactor(
    "twisted.internet.asyncioreactor.AsyncioSelectorReactor",
)
FEED_EXPORT_ENCODING = "utf-8"
# DOWNLOAD_HANDLERS = {  # noqa: ERA001, RUF100
#     "http": "scrapy_impersonate.ImpersonateDownloadHandler",  # noqa: ERA001
#     "https": "scrapy_impersonate.ImpersonateDownloadHandler",  # noqa: ERA001
# }  # noqa: ERA001, RUF100
FEEDS = {
    "comics.json": {
        "format": "json",
        "encoding": "utf8",
        "store_empty": False,
        "item_classes": ["crawler.items.ComicItem"],
        "fields": None,
        "indent": 4,
    },
    "chapters2.json": {
        "format": "json",
        "encoding": "utf8",
        "store_empty": False,
        "item_classes": ["crawler.items.ChapterItem"],
        "fields": None,
        "indent": 4,
    },
}
RETRY_TIMES = 2
RETRY_ENABLED = True
RETRY_HTTP_CODES = list(range(300, 501))

DOWNLOAD_FAIL_ON_DATALOSS = True
# LOG_LEVEL = "DEBUG"
LOG_LEVEL = "INFO"  # noqa: ERA001

# AWS
# IMAGES_STORE = "s3://bucket/images"  # noqa: ERA001
# IMAGES_STORE_S3_ACL = "public-read"  # noqa: ERA001
# AWS_ENDPOINT_URL = "http://minio.example.com:9000"  # noqa: ERA001
# AWS_USE_SSL = False  # or True (None by default)  # noqa: ERA001
# AWS_VERIFY = False  # or True (None by default)  # noqa: ERA001

# GCLOUD
# IMAGES_STORE = "gs://bucket/images/"  # noqa: ERA001
# GCS_PROJECT_ID = "project_id"  # noqa: ERA001
# IMAGES_STORE_GCS_ACL = "publicRead"  # noqa: ERA001


# LOCAL
IMAGES_STORE = settings.MEDIA_ROOT

IMAGES_URLS_FIELD = "image_urls"
IMAGES_RESULT_FIELD = "images"

# 1460 days of delay for files expiration
FILES_EXPIRES = 1460

# 730 days of delay for images expiration
IMAGES_EXPIRES = 730


# IMAGES_THUMBS = {  # noqa: ERA001, RUF100
#     "small": (50, 50),  # noqa: ERA001
#     "big": (270, 270),  # noqa: ERA001
# }  # noqa: ERA001, RUF100


IMAGES_MIN_HEIGHT = 110
IMAGES_MIN_WIDTH = 110

MEDIA_ALLOW_REDIRECTS = True

# REDIS_URL = settings.CELERY_BROKER_URL  # noqa: ERA001
# DUPEFILTER_CLASS = "scrapy_redis.dupefilter.RFPDupeFilter"  # noqa: ERA001
# SCHEDULER = "scrapy_redis.scheduler.Scheduler"  # noqa: ERA001
# SCHEDULER_PERSIST = False  # noqa: ERA001

# SELENIUM_DRIVER_NAME = "firefox"  # noqa: ERA001
# SELENIUM_DRIVER_EXECUTABLE_PATH = which("geckodriver")  # noqa: ERA001
# SELENIUM_BROWSER_EXECUTABLE_PATH = which("firefox")  # noqa: ERA001
SELENIUM_DRIVER_NAME = "chrome"
SELENIUM_DRIVER_EXECUTABLE_PATH = which("chromedriver")
SELENIUM_BROWSER_EXECUTABLE_PATH = which("chrome")
SELENIUM_DRIVER_ARGUMENTS = [
    "--headless",
    # "--no-sandbox",
    # "--disable-gpu",
    # "--enable-javascript",
    # "--disable-extensions",
]
