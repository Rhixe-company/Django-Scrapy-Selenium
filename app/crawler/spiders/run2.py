import logging

from scrapy.http.request import Request
from scrapy.loader import ItemLoader
from scrapy.spiders import Spider

from crawler.items import ChapterItem
from crawler.items import ComicItem

logger = logging.getLogger(__name__)


class Run2Spider(Spider):
    name = "run2"

    def start_requests(self):
        # Custom start URLs
        urls = ["https://manganato.com/genre-all"]
        for browser in ["chrome124"]:
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
                msg = f"Page: {response.urljoin(link)}"
                logger.info(msg)
                yield response.follow(
                    response.urljoin(link),
                    callback=self.comicpage,
                )
        if page_range:
            urls = [
                f"https://manganato.com/genre-all/{i}"
                for i in range(2, page_range.split("/")[-1])
            ]
            for url in urls:
                msg = f"Page: {url}"
                logger.info(msg)
                yield response.follow(
                    response.urljoin(url),
                    callback=self.comicspage,
                )

    def comicpage(self, response):
        loader = ItemLoader(item=ComicItem(), selector=response)
        loader.add_xpath(
            "title",
            '//div[contains(@class, "story-info-right")]/h1/text()',
        )
        loader.add_xpath(
            "slug",
            '//div[contains(@class, "panel-breadcrumb")]/a[contains(@class, "a-h")][3]/@href',  # noqa: E501
        )
        chapters = response.xpath(
            '//ul[contains(@class, "row-content-chapter")]/li/a[contains(@class, "chapter-name text-nowrap")]/@href',  # noqa: E501
        ).getall()[0:1]
        item = loader.load_item()
        yield item
        msg = f"A New Comic found at: {response.url}"
        logger.info(msg)
        if chapters:
            msg = f"Total Chapters found: {len(chapters)}"
            logger.info(msg)
            for chapter in chapters:
                msg = f"Page: {chapter}"
                logger.info(msg)
                yield response.follow(
                    response.urljoin(chapter),
                    callback=self.chapterpage,
                )

    def chapterpage(self, response):
        loader = ItemLoader(item=ChapterItem(), selector=response)
        chaptername = response.xpath(
            '//div[contains(@class, "panel-breadcrumb")]/a[contains(@class, "a-h")][3]/text()',  # noqa: E501
        ).get()
        chapterslug = response.xpath(
            '//div[contains(@class, "panel-breadcrumb")]/a[contains(@class, "a-h")][3]/@href',  # noqa: E501
        ).get()
        loader.add_value("chaptername", chaptername)
        loader.add_value("chapterslug", chapterslug)
        item = loader.load_item()
        yield item
        msg = f"A New Chapter found at: {response.url}"
        logger.info(msg)
