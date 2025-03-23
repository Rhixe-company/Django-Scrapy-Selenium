import json
import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.models import Q
from django.db.utils import IntegrityError

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

    def handle(self, *args, **options):  # noqa: C901, PLR0915
        def save_comics(comics_data):
            for item in comics_data:
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
                images = item.get("images")
                title = item["title"]
                slug = item["slug"]
                description = item.get("description")
                rating = item["rating"]
                status = item["status"]
                link = item["url"]
                spider = item["spider"]
                updated_at = item["updated_at"]
                numchapters = item["numchapters"]
                numimages = len(images)
                serialization = item["serialization"]
                category = item.get("category")
                author = item.get("author")
                artist = item.get("artist")
                genres = item.get("genres")
                if images:
                    newauthor = Author.objects.update_or_create(name=author)[0]
                    newartist = Artist.objects.update_or_create(name=artist)[0]
                    newcategory = Category.objects.update_or_create(name=category)[0]
                    comic = Comic.objects.get_search(  # type: ignore  # noqa: PGH003
                        title,
                        slug,
                    )
                    if comic.exists():
                        msg1 = f"{title} - {slug} Exists"
                        logger.error(
                            msg1,
                        )
                    else:
                        try:
                            newcomic = Comic.objects.update_or_create(
                                title=title,
                                slug=slug,
                                description=description,
                                rating=rating,
                                status=status,
                                link=link,
                                spider=spider,
                                updated_at=updated_at,
                                numchapters=numchapters,
                                numimages=numimages,
                                serialization=serialization,
                                category=newcategory,
                                author=newauthor,
                                artist=newartist,
                            )[0]
                            msg = f"created {newcomic.title}"
                            logger.info(
                                msg,
                            )
                            if genres:
                                for genre in genres:
                                    newgenre = Genre.objects.update_or_create(
                                        name=genre,
                                    )[0]
                                    newcomic.genres.add(newgenre)
                                    newcomic.save()
                            for image in images:
                                ComicImage.objects.update_or_create(
                                    link=image["url"],
                                    image=image["path"],
                                    status=image["status"],
                                    comic=newcomic,
                                )[0]
                        except IntegrityError:
                            msg8 = f"{slug} - {title} Exists"
                            logger.error(msg8)  # noqa: TRY400

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
                comic = Comic.objects.get_search(  # type: ignore  # noqa: PGH003
                    comictitle,
                    comicslug,
                )
                if (
                    comic.exists()  # type: ignore  # noqa: PGH003
                ):
                    if images:
                        dbcomic = comic.first()
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
                            try:
                                newchapter = Chapter.objects.update_or_create(
                                    title=title,
                                    slug=slug,
                                    name=name,
                                    link=link,
                                    spider=spider,
                                    updated_at=updated_at,
                                    numimages=numimages,
                                    comic=dbcomic,
                                )[0]
                                msg2 = f"created {newchapter}"
                                logger.info(
                                    msg2,
                                )
                                for image in images:
                                    ChapterImage.objects.update_or_create(
                                        link=image["url"],
                                        image=image["path"],
                                        status=image["status"],
                                        chapter=newchapter,
                                        comic=dbcomic,
                                    )[0]
                            except IntegrityError:
                                msg7 = f"{slug} - {name} Exists"
                                logger.error(msg7)  # noqa: TRY400
                else:
                    msg4 = f"{comictitle} Does Not Exists"
                    logger.error(
                        msg4,
                    )

        base = settings.BASE_DIR
        comics_file = str(base / "comics.json")
        with open(comics_file, encoding="utf-8") as comic_file:  # noqa: PTH123
            comics_data = json.load(comic_file)
            save_comics(comics_data=comics_data)
        chapters_file = str(base / "chapters.json")
        with open(chapters_file, encoding="utf-8") as chapter_file:  # noqa: PTH123
            chapters_data = json.load(chapter_file)
            save_chapters(chapters_data=chapters_data)
        comics = Comic.objects.all()
        comic_images = ComicImage.objects.select_related("comic").all()
        chapters = Chapter.objects.all()

        chapter_images = ChapterImage.objects.select_related("comic", "chapter").all()
        context = {
            "Comics": comics,
            "Comics_Count": comics.count(),
            "ComicsImage": comic_images,
            "ComicsImage_Count": comic_images.count(),
            "Chapters": chapters,
            "Chapters_Count": chapters.count(),
            "ChaptersImage": chapter_images,
            "ChaptersImage_Count": chapter_images.count(),
        }
        logger.info(context)
