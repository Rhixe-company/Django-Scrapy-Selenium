import json
import logging

from api.libary.models import Artist
from api.libary.models import Author
from api.libary.models import Category
from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage
from api.libary.models import Genre
from api.libary.models import Website
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.models import Q
from django.db.utils import IntegrityError

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generates comics for apps"

    def handle(self, *args, **options):  # noqa: C901, PLR0915
        def save_comics(comics_data):
            comics = Comic.objects.all()
            comic_images = ComicImage.objects.select_related("comic").all()
            logger.info(
                {
                    "Start Comics_Count": comics.count(),
                    "Start ComicsImage_Count": comic_images.count(),
                },
            )
            usermodel = get_user_model()
            user = usermodel.objects.filter(
                Q(email__icontains="admin@rhixe.company")
                | Q(username__icontains="adminbot"),
            ).first()
            if not user:
                user = usermodel.objects.create_superuser(  # type: ignore  # noqa: PGH003
                    email="admin@rhixe.company",
                    username="adminbot",
                    password="R4I7gcJHX",  # noqa: S106
                )
            for item in comics_data:
                images = item.get("images")
                title = item["title"]
                slug = item["slug"]
                description = item.get("description")
                rating = item["rating"]
                status = item["status"]
                updated_at = item["updated_at"]
                numchapters = item["numchapters"]
                numimages = len(images)
                serialization = item["serialization"]
                category = item.get("category")
                author = item.get("author")
                artist = item.get("artist")
                genres = item.get("genres")
                if images:
                    newauthor = Author.objects.get_or_create(name=author)[0]
                    newartist = Artist.objects.get_or_create(name=artist)[0]
                    newcategory = Category.objects.get_or_create(name=category)[0]
                    dbwebsite = Website.objects.filter(
                        Q(name__exact=item["spider"]) | Q(link__exact=item.get("url")),
                    ).first()
                    if not dbwebsite:
                        dbwebsite = Website.objects.get_or_create(
                            name=item["spider"],
                            link=item.get("url"),
                        )[0]
                    comic = Comic.objects.get_search(title, slug)
                    if comic.exists():
                        msg = f"{slug} - {title} Exists"
                        logger.error(msg)
                    else:
                        try:
                            newcomic = Comic.objects.get_or_create(
                                user=user,
                                title=title,
                                slug=slug,
                                description=description,
                                rating=rating,
                                status=status,
                                website=dbwebsite,
                                updated_at=updated_at,
                                numchapters=numchapters,
                                numimages=numimages,
                                serialization=serialization,
                                category=newcategory,
                                author=newauthor,
                                artist=newartist,
                            )[0]
                            if genres:
                                for genre in genres:
                                    newgenre = Genre.objects.get_or_create(
                                        name=genre,
                                    )[0]

                                    newcomic.genres.add(newgenre)
                                    newcomic.save()
                            for image in images:
                                ComicImage.objects.get_or_create(
                                    link=image["url"],
                                    image=image["path"],
                                    status=image["status"],
                                    comic=newcomic,
                                )[0]

                        except IntegrityError:
                            msg = f"{slug} - {title} Exists "
                            logger.exception(msg)  # noqa: B904, RUF100

            logger.info(
                {
                    "Comics": comics[0:2],
                    "ComicsImage": comic_images[0:2],
                    "End Comics_Count": comics.count(),
                    "End ComicsImage_Count": comic_images.count(),
                },
            )

        def save_chapters(chapters_data):
            chapters = Chapter.objects.all()
            chapter_images = ChapterImage.objects.select_related(
                "comic",
                "chapter",
            ).all()
            logger.info(
                {
                    "Start Chapters_Count": chapters.count(),
                    "Start ChaptersImage_Count": chapter_images.count(),
                },
            )
            for item in chapters_data:
                images = item.get("images")
                comicslug = item["comicslug"]
                comictitle = item["comictitle"]
                name = item["chaptername"]
                title = item.get("chaptertitle", "")
                slug = item["chapterslug"]
                updated_at = item.get("updated_at")
                numimages = len(images)
                dbwebsite = Website.objects.filter(
                    Q(name__exact=item["spider"]) | Q(link__exact=item.get("url")),
                ).first()
                if not dbwebsite:
                    dbwebsite = Website.objects.get_or_create(
                        name=item["spider"],
                        link=item.get("url"),
                    )[0]
                comic = Comic.objects.get_search(comictitle, comicslug)
                if (
                    comic.exists()  # type: ignore  # noqa: PGH003
                ):
                    if images:
                        dbcomic = comic.first()
                        chapter = Chapter.objects.get_search(slug)
                        if chapter.exists():
                            msg = f"{slug} - {comictitle} Exists"
                            logger.error(
                                msg,
                            )
                        else:
                            try:
                                newchapter = Chapter.objects.get_or_create(
                                    title=title,
                                    slug=slug,
                                    name=name,
                                    website=dbwebsite,
                                    updated_at=updated_at,
                                    numimages=numimages,
                                    comic=dbcomic,
                                )[0]
                            except IntegrityError:
                                msg = f"{slug} - {name} Failed"
                                logger.error(msg)  # noqa: B904, RUF100, TRY400
                            for image in images:
                                ChapterImage.objects.get_or_create(
                                    link=image["url"],
                                    image=image["path"],
                                    status=image["status"],
                                    chapter=newchapter,
                                    comic=dbcomic,
                                )[0]

                else:
                    msg = f"{comictitle} Does Not Exists"
                    logger.error(
                        msg,
                    )
            logger.info(
                {
                    "Chapters": chapters[0:2],
                    "ChaptersImage": chapter_images[0:2],
                    "End Chapters_Count": chapters.count(),
                    "End ChaptersImage_Count": chapter_images.count(),
                },
            )

        def load():
            base = settings.BASE_DIR
            comics_file = str(base / "comics.json")
            with open(comics_file, encoding="utf-8") as comic_file:  # noqa: PTH123
                comics_data = json.load(comic_file)
                save_comics(comics_data=comics_data)
            chapters_file = str(base / "chapters.json")
            with open(chapters_file, encoding="utf-8") as chapter_file:  # noqa: PTH123
                chapters_data = json.load(chapter_file)
                save_chapters(chapters_data=chapters_data)

        load()
