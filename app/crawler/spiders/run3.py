import json
import logging

from scrapy.http.request import Request
from scrapy.spiders import Spider

logger = logging.getLogger(__name__)


class Run3Spider(Spider):
    name = "run3"
    allowed_domains = ["comick.io"]
    start_urls = [
        "https://comick.io/home2",
    ]

    def start_requests(self):
        # Custom start URLs
        for url in self.start_urls:
            msg = f"Page: {url}"
            logger.info(msg)
            yield Request(
                url=url,
                meta={
                    "impersonate": "chrome124",
                },
                callback=self.comicspage,
            )

    def comicspage(self, response):
        data_el = response.xpath(
            "//script[@id='__NEXT_DATA__']/text()",
        ).get()
        data = json.loads(data_el)
        if data:
            yield {
                "data": data["props"]["pageProps"]["data"],
            }
