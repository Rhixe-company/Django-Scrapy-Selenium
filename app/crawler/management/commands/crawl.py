import logging

from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage
from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
from scrapy.utils.log import configure_logging
from scrapy.utils.project import get_project_settings

from crawler.spiders.run import RunSpider

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "A  Custom command to  run RunSpider"

    def handle(self, *args, **options):
        crawlsettings = get_project_settings()
        configure_logging(crawlsettings)

        process = CrawlerProcess(settings=crawlsettings)
        process.crawl(RunSpider)
        process.start()
        comics = (
            Comic.objects.prefetch_related(
                "comicitems",
                "comicchapters",
                "genres",
                "followers",
            )
            .select_related("author", "category", "artist", "user")
            .all()
        )

        comic_images = ComicImage.objects.select_related("comic").all()
        chapters = (
            Chapter.objects.prefetch_related("chapteritems")
            .select_related("comic")
            .all()
        )

        chapter_images = ChapterImage.objects.select_related("comic", "chapter").all()
        context = {
            "Comics": comics.values(),
            "ComicsImage": comic_images.values(),
            "Chapters": chapters.values(),
            "ChaptersImage": chapter_images.values(),
            "Comics_Count": comics.count(),
            "ComicsImage_Count": comic_images.count(),
            "Chapters_Count": chapters.count(),
            "ChaptersImage_Count": chapter_images.count(),
        }

        logger.info(context)
