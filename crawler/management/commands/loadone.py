import json
import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.models import Q

from project.libary.models import Artist
from project.libary.models import Author
from project.libary.models import Category
from project.libary.models import Chapter
from project.libary.models import ChapterImage
from project.libary.models import Comic
from project.libary.models import ComicImage
from project.libary.models import Genre

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generates comics for apps"

    def handle(self, *args, **options):
        def save_chapters(chapters_data):
            for item in chapters_data:
                images = item.get("images")
                comicslug = item["comicslug"]
                comictitle = item["comictitle"]
                name = item["chaptername"]
                title = item.get("chaptertitle", "")
                slug = item["chapterslug"]
                link = item["url"]
                spider = item["spider"]
                updated_at = item.get("updated_at")
                numimages = len(images)
                if (
                    comictitle == "The Indomitable Martial King"
                    or comictitle.lower() == "The Indomitable Martial King"
                ):
                    chapter = Chapter.objects.get_search(  # type: ignore  # noqa: PGH003
                        slug,
                        comictitle,
                    )
                    if chapter.exists():
                        msg3 = f"{chapter.first().chapter_id} - {chapter.first().slug} - {chapter.first().comic.title} Exists"  # noqa: E501
                        logger.error(
                            msg3,
                        )
                    else:
                        logger.info(name)

        base = settings.BASE_DIR
        # comics_file = str(base / "comics.json")
        # with open(comics_file, encoding="utf-8") as comic_file:  # noqa: PTH123
        #     comics_data = json.load(comic_file)
        #     save_comics(comics_data=comics_data)
        chapters_file = str(base / "chapters.json")
        with open(chapters_file, encoding="utf-8") as chapter_file:  # noqa: PTH123
            chapters_data = json.load(chapter_file)
            save_chapters(chapters_data=chapters_data)
