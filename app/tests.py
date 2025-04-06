import scrapy


class TestsSpider(scrapy.Spider):
    name = "tests"
    allowed_domains = ["gg.asuracomic.net"]
    start_urls = ["https://gg.asuracomic.net"]

    def parse(self, response):
        pass
