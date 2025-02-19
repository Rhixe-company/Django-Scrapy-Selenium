from __future__ import annotations

import warnings
from contextlib import suppress
from typing import TYPE_CHECKING

from itemadapter import ItemAdapter
from itemadapter.adapter import ItemAdapter  # noqa: F811
from scrapy.crawler import Crawler  # noqa: TC002
from scrapy.exceptions import DropItem
from scrapy.exceptions import ScrapyDeprecationWarning
from scrapy.http import Request  # type: ignore  # noqa: PGH003
from scrapy.http.request import NO_CALLBACK
from scrapy.http.request import Request  # noqa: F811
from scrapy.pipelines.images import ImagesPipeline
from scrapy.utils.python import get_func_args
from scrapy.utils.python import global_object_name
from typing_extensions import Self  # noqa: UP035

if TYPE_CHECKING:
    from scrapy.settings import Settings


class CrawlerDownloadPipeline(ImagesPipeline):

    @classmethod
    def from_settings(cls, settings: Settings, crawler: Crawler | None) -> Self:
        cls._update_stores(settings)
        # s3store = cls.STORE_SCHEMES["s3"]  # noqa: ERA001
        # s3store.AWS_ACCESS_KEY_ID = settings["AWS_ACCESS_KEY_ID"]  # noqa: ERA001
        # s3store.AWS_SECRET_ACCESS_KEY = settings["AWS_SECRET_ACCESS_KEY"]  # noqa: E501, ERA001
        # s3store.AWS_SESSION_TOKEN = settings["AWS_SESSION_TOKEN"]  # noqa: ERA001
        # s3store.AWS_ENDPOINT_URL = settings["AWS_ENDPOINT_URL"]  # noqa: ERA001
        # s3store.AWS_REGION_NAME = settings["AWS_REGION_NAME"]  # noqa: ERA001
        # s3store.AWS_USE_SSL = settings["AWS_USE_SSL"]  # noqa: ERA001
        # s3store.AWS_VERIFY = settings["AWS_VERIFY"]  # noqa: ERA001
        # s3store.POLICY = settings["IMAGES_STORE_S3_ACL"]  # noqa: ERA001
        store_uri = settings["IMAGES_STORE"]
        if "crawler" in get_func_args(cls.__init__):
            o = cls(store_uri, crawler=crawler)
        else:
            o = cls(store_uri, settings=settings)
            if crawler:
                o._finish_init(crawler)  # noqa: SLF001
            warnings.warn(  # noqa: B028
                f"{global_object_name(cls)}.__init__() doesn't take a crawler argument."
                " This is deprecated and the argument will be required in future Scrapy versions.",  # noqa: E501, PGH003 # type: ignore
                category=ScrapyDeprecationWarning,
            )
        return o

    @classmethod
    def from_crawler(cls, crawler):
        return cls.from_settings(crawler.settings)  # type: ignore  # noqa: PGH003

    def get_media_requests(self, item, info):
        adapter = ItemAdapter(item)
        if adapter.get("image_urls"):
            if adapter.get("slug"):
                urls = ItemAdapter(item).get(self.images_urls_field, [])
                for browser in ["chrome110", "edge99", "safari15_5"]:
                    return [
                        Request(
                            u,
                            meta={
                                "impersonate": browser,
                                "comicfolderslug": item.get("slug"),
                            },
                            callback=NO_CALLBACK,
                        )
                        for u in urls
                    ]
            if adapter.get("comicslug") and adapter.get("chapterslug"):
                urls = ItemAdapter(item).get(self.images_urls_field, [])
                for browser in ["chrome110", "edge99", "safari15_5"]:
                    return [
                        Request(
                            u,
                            meta={
                                "impersonate": browser,
                                "comicfolderslug": item.get("comicslug"),
                                "chapterfolderslug": item.get("chapterslug"),
                            },
                            callback=NO_CALLBACK,
                        )
                        for u in urls
                    ]
            return None
        msg = f"Missing field in get_media_requests: {item!r}"
        raise DropItem(msg)

    def item_completed(self, results, item, info):
        with suppress(KeyError):
            item["images"] = ItemAdapter(item)[self.images_result_field] = [
                x for ok, x in results if ok
            ]
        return item

    def file_path(self, request, response=None, info=None, *, item=None):
        adapter = ItemAdapter(item)
        if adapter.get("image_urls"):
            if adapter.get("image_urls") and adapter.get("slug"):
                return "{}/{}".format(
                    request.meta["comicfolderslug"],
                    request.url.split("/")[-1],
                )
            if (
                adapter.get("image_urls")
                and adapter.get("comicslug")
                and adapter.get("chapterslug")
            ):
                return "{}/{}/{}".format(
                    request.meta["comicfolderslug"],
                    request.meta["chapterfolderslug"],
                    request.url.split("/")[-1],
                )
            return None
        msg = f"Missing field in file_path: {item!r}"
        raise DropItem(msg)
