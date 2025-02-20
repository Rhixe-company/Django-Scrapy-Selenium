from pathlib import PurePosixPath

from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
from scrapy.http.request import NO_CALLBACK
from scrapy.http.request import Request
from scrapy.pipelines.images import ImagesPipeline
from scrapy.utils.httpobj import urlparse_cached


class MyImagesPipeline(ImagesPipeline):
    def get_media_requests(self, item, info):
        adapter = ItemAdapter(item)
        if adapter.get("image_urls"):
            if adapter.get("slug"):
                urls = ItemAdapter(item).get(self.images_urls_field, [])
                return [
                    Request(
                        u,
                        callback=NO_CALLBACK,
                        meta={
                            "comicfolderslug": item.get("slug"),
                        },
                    )
                    for u in urls
                ]
            if adapter.get("comicslug") and adapter.get("chapterslug"):
                urls = ItemAdapter(item).get(self.images_urls_field, [])
                return [
                    Request(
                        u,
                        callback=NO_CALLBACK,
                        meta={
                            "comicfolderslug": item.get("comicslug"),
                            "chapterfolderslug": item.get("chapterslug"),
                        },
                    )
                    for u in urls
                ]
            return None
        msg = f"Missing field in get_media_requests: {item!r}"
        raise DropItem(msg)

    def item_completed(self, results, item, info):
        images = [x for ok, x in results if ok]
        if not images:
            msg = "Item contains no images"
            raise DropItem(msg)
        adapter = ItemAdapter(item)
        adapter["images"] = images
        return item

    def file_path(self, request, response=None, info=None, *, item=None):
        adapter = ItemAdapter(item)
        if adapter.get("image_urls"):
            if adapter.get("image_urls") and adapter.get("slug"):
                return "{}/{}".format(
                    request.meta["comicfolderslug"],
                    PurePosixPath(urlparse_cached(request).path).name,
                )
            if (
                adapter.get("image_urls")
                and adapter.get("comicslug")
                and adapter.get("chapterslug")
            ):
                return "{}/{}/{}".format(
                    request.meta["comicfolderslug"],
                    request.meta["chapterfolderslug"],
                    PurePosixPath(urlparse_cached(request).path).name,
                )
            return None
        msg = f"Missing field in file_path: {item!r}"
        raise DropItem(msg)
