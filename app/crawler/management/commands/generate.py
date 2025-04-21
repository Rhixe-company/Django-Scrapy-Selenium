import json
import logging

from api.libary.models import Chapter
from api.libary.models import Comic
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.models import Q

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generates comics for apps"

    def handle(self, *args, **options):
        def save_comics(comics_data):
            newcomics = []
            for item in comics_data:
                title = item["title"]
                slug = item["slug"]
                dbcomics = Comic.objects.filter(
                    Q(title__iexact=title) & Q(slug__iexact=slug),
                )
                if dbcomics.exists():
                    msg = f"Saving {dbcomics.first().pk} - {dbcomics.first().slug} - {dbcomics.first().title}"  # type: ignore  # noqa: E501, PGH003
                    logger.info(msg)
                    newcomics.append(item)
                else:
                    msg = f"{slug} - {title} Doesn`t Exists"
                    logger.error(msg)
            return newcomics

        def save_chapters(chapters_data):
            newchapters = []
            for item in chapters_data:
                slug = item["chapterslug"]
                name = item["chaptername"]
                chapters = Chapter.objects.filter(  # type: ignore  # noqa: PGH003
                    Q(name__iexact=name) & Q(slug__iexact=slug),
                )
                if chapters.exists():
                    newchapters.append(item)
                    msg = f" Saving {chapters.first().pk} - {chapters.first().slug} - {chapters.first().comic.title}"  # type: ignore  # noqa: E501, PGH003
                    logger.info(
                        msg,
                    )
                    newchapters.append(item)
                else:
                    msg = f"{slug} - {name} Doesn`t Exists"
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
                # Convert the list to a JSON formatted string
                chapters_json_string = json.dumps(chapters)
                # Write the JSON string to a file
                with open(new_chapters_file, "w", encoding="utf-8") as json_file:  # noqa: PTH123
                    json_file.write(chapters_json_string)
            logger.info(
                {
                    "data_comics": comics[0],
                    "data_chapters": chapters[0],
                    "count_comics": len(comics),
                    "count_chapters": len(chapters),
                },
            )

        load()
