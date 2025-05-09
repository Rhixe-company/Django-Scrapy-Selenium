import logging

from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
from scrapy.utils.log import configure_logging
from scrapy.utils.project import get_project_settings

from crawler.spiders.run import RunSpider

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "A  Custom command to  run1 Run1Spider"

    def handle(self, *args, **options):
        crawlsettings = get_project_settings()
        configure_logging(crawlsettings)

        process = CrawlerProcess(settings=crawlsettings)
        logger.info("starting spider")
        process.crawl(RunSpider)
        process.start()
        logger.info("ending spider")
