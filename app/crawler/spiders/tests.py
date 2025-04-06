import logging

# from bs4 import BeautifulSoup  # noqa: ERA001
from scrapy.http.request import Request
from scrapy.loader import ItemLoader
from scrapy.spiders import Spider

from crawler.items import ComicItem

logger = logging.getLogger(__name__)


class TestsSpider(Spider):
    name = "tests"
    allowed_domains = ["gg.asuracomic.net", "asuracomic.net"]
    start_urls = [
        f"https://asuracomic.net/series?page={i}&order=update" for i in range(1, 2)
    ]

    def start_requests(self):
        # Custom start URLs

        for url in self.start_urls:
            msg = f"Page: {url}"
            logger.info(msg)
            yield Request(
                url=url,
                # meta={
                #     "impersonate": "chrome124",
                # },
                callback=self.comicspage,
            )

    def comicspage(self, response):
        links = response.xpath(
            "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a/@href",  # noqa: E501
        ).getall()
        if links:
            for link in links:
                msg = f"Page: {response.urljoin(link)}"
                logger.info(msg)
                yield response.follow(
                    response.urljoin(link),
                    callback=self.comicpage,
                )

    def comicpage(self, response):
        loader = ItemLoader(item=ComicItem(), selector=response)
        loader.add_xpath(
            "title",
            '//span[contains(@class, "text-xl font-bold")]/text()',
        )
        loader.add_xpath("slug", '//span[contains(@class, "text-xl font-bold")]/text()')

        loader.add_xpath(
            "serialization",
            "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[1]/h3[2]/text()",  # noqa: E501
        )
        loader.add_xpath(
            "author",
            "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[2]/h3[2]/text()",  # noqa: E501
        )
        loader.add_xpath(
            "artist",
            "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[3]/h3[2]/text()",  # noqa: E501
        )
        loader.add_xpath(
            "rating",
            '//p[contains(@class, "text-sm text-[#A2A2A2] relative top-px")]/text()',
        )
        loader.add_xpath(
            "status",
            "//div[@class='bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full']/h3[2]/text()",  # noqa: E501
        )
        loader.add_xpath(
            "category",
            "//div[@class='bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full'][2]/h3[2]/text()",  # noqa: E501
        )
        loader.add_xpath(
            "genres",
            "//div[@class='flex flex-row flex-wrap gap-3']/button/text()",
        )
        loader.add_xpath(
            "description",
            '//div[contains(@class, "col-span-12 sm:col-span-9")]/span/p/text()',
        )
        image = response.xpath("//img[@class='rounded mx-auto md:mx-0 ']/@src").get()
        image2 = response.xpath(
            '//div[contains(@class, "bigcover")]/img[contains(@data-nimg, "1")]/@src',
        ).get()

        chapters = response.xpath(
            '//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")]/a/@href',  # noqa: E501
        ).getall()[0:1]
        comic_time = response.xpath(
            '//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")]/a/h3[contains(@class, "text-xs text-[#A2A2A2]")]/text()',  # noqa: E501
        ).get()
        loader.add_value("updated_at", comic_time)
        loader.add_value("link", response.url)
        cimages = []
        cimages.append(response.urljoin(image))
        if image2:
            cimages.append(response.urljoin(image2))
        loader.add_value("image_urls", cimages)
        loader.add_value(
            "numchapters",
            len(
                chapters,
            ),
        )
        item = loader.load_item()
        yield item
        # Use lxml to get decent HTML parsing speed
        # soup = BeautifulSoup(response.text, "lxml")  # noqa: ERA001
        # yield {"url": response.url, "title": soup.h1.string}  # type: ignore  # noqa: E501, ERA001, PGH003
