import logging

from scrapy.http.request import Request
from scrapy.loader import ItemLoader
from scrapy.spiders import Spider
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec

from crawler.items import ChapterItem
from crawler.items import ComicItem

logger = logging.getLogger(__name__)


class Run2Spider(Spider):
    name = "run2"

    def start_requests(self):
        # Custom start URLs
        urls = ["https://manganato.com/genre-all"]
        for browser in ["chrome124", "edge101", "safari17_2_ios"]:

            for url in urls:
                yield Request(
                    url=url,
                    meta={
                        "impersonate": browser,
                    },
                    callback=self.comicspage,
                )

    def comicspage(self, response):
        links = response.xpath(
            "//div[@class='content-genres-item']/a/@href",
        ).getall()
        page_range = response.xpath(
            "//div[@class='group-page']/a[@class='page-blue page-last']/@href",
        ).get()
        if links:
            for link in links:
                yield {
                    "url": response.urljoin(link),
                    "page-url": page_range.split("/")[-1],
                }
