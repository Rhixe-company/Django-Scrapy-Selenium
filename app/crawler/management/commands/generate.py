import json
import logging

from api.libary.models import Chapter
from api.libary.models import Comic
from django.conf import settings
from django.core.management.base import BaseCommand

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generates comics for apps"

    def handle(self, *args, **options):  # noqa: PLR0915
        def save_comics(comics_data):
            newcomics = []
            for item in comics_data:
                title = item["title"]
                slug = item["slug"]
                comic = Comic.objects.get_search(title, slug)
                if comic.exists():
                    if comic.first().slug == slug:  # type: ignore  # noqa: PGH003
                        newcomics.append(item)
                        msg = f"{comic.first().pk} - {comic.first().slug} - {comic.first().title} Saving Exists"  # type: ignore  # noqa: E501, PGH003
                        logger.info(msg)
                    else:
                        msg = f"{slug} - {title} Exists"
                        logger.error(msg)
                else:
                    msg = f"{slug} - {title} Does Not Exists"
                    logger.error(msg)
            return newcomics

        def save_chapters(chapters_data):
            newchapters = []
            for item in chapters_data:
                comictitle = item["comictitle"]
                slug = item["chapterslug"]
                chapter = Chapter.objects.get_search(  # type: ignore  # noqa: PGH003
                    slug,
                )
                if chapter.exists():
                    if chapter.first().slug == slug:  # type: ignore  # noqa: PGH003
                        newchapters.append(item)
                        msg = f"{chapter.first().pk} - {chapter.first().slug} - {chapter.first().comic.title} Saving"  # type: ignore  # noqa: E501, PGH003
                        logger.info(
                            msg,
                        )
                    else:
                        msg = f"{slug} - {comictitle} Exists"
                        logger.error(
                            msg,
                        )
                else:
                    msg = f" {slug} - {comictitle} Does not Exists"
                    logger.error(
                        msg,
                    )
            return newchapters

        def load():
            base = settings.BASE_DIR
            comics_file = str(base / "comics2.json")
            chapters_file = str(base / "chapters2.json")
            new_comics_file = str(base / "comics.json")
            new_chapters_file = str(base / "chapters.json")
            with open(comics_file, encoding="utf-8") as comic_file:  # noqa: PTH123
                comics_data = json.load(comic_file)
                comics = save_comics(comics_data=comics_data)
                # Convert the list to a JSON formatted string
                comics_json_string = json.dumps(comics)
                # Write the JSON string to a file
                with open(new_comics_file, "w", encoding="utf-8") as json_file:  # noqa: PTH123
                    json_file.write(comics_json_string)
            with open(chapters_file, encoding="utf-8") as chapter_file:  # noqa: PTH123
                chapters_data = json.load(chapter_file)
                chapters = save_chapters(chapters_data=chapters_data)
                chapters_json_string = json.dumps(chapters)
                # Write the JSON string to a file
                with open(new_chapters_file, "w", encoding="utf-8") as json_file:  # noqa: PTH123
                    json_file.write(chapters_json_string)

            logger.info(
                {
                    "data_comics": comics[0:2],
                    "data_chapters": chapters[0:2],
                    "count_comics": len(comics),
                    "count_chapters": len(chapters),
                },
            )

        load()
