import logging

from api.libary.models import Artist
from api.libary.models import Author
from api.libary.models import Category
from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage
from api.libary.models import Genre
from api.libary.models import Spidermodel
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.db.utils import IntegrityError
from itemadapter.adapter import ItemAdapter
from scrapy.exceptions import DropItem

logger = logging.getLogger(__name__)


class DbPipeline:
    def process_item(self, item, spider):  # noqa: C901, PLR0912, PLR0915
        adapter = ItemAdapter(item)
        if adapter.get("images"):
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
            if adapter.get("images") and adapter.get("slug"):
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
                    newauthor = Author.objects.update_or_create(name=author)[0]
                    newartist = Artist.objects.update_or_create(name=artist)[0]
                    newcategory = Category.objects.update_or_create(name=category)[0]
                    oldspider = Spidermodel.objects.filter(
                        Q(name__exact=item["spider"]) | Q(link__exact=item.get("url")),
                    ).first()
                    if not oldspider:
                        oldspider = Spidermodel.objects.update_or_create(
                            name=item["spider"],
                            link=item.get("url"),
                        )[0]
                    comic = Comic.objects.filter(  # type: ignore  # noqa: PGH003
                        Q(title__exact=title) | Q(slug__exact=slug),
                    )
                    if comic.exists():
                        msg = f"{slug} - {title} Exists"
                        raise DropItem(msg)
                    try:
                        newcomic = Comic.objects.update_or_create(
                            title=title,
                            slug=slug,
                            description=description,
                            rating=rating,
                            status=status,
                            spider=oldspider,
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
                        msg = f"{slug} - {title} Exists "
                        raise DropItem(msg)  # noqa: B904, RUF100
                return item
            if (
                adapter.get("images")
                and adapter.get("comicslug")
                and adapter.get("chapterslug")
            ):
                images = item.get("images")
                comicslug = item["comicslug"]
                comictitle = item["comictitle"]
                name = item["chaptername"]
                title = item.get("chaptertitle", "")
                slug = item["chapterslug"]
                updated_at = item.get("updated_at")
                numimages = len(images)
                oldspider = Spidermodel.objects.filter(
                    Q(name__exact=item["spider"]) | Q(link__exact=item.get("url")),
                ).first()
                if not oldspider:
                    oldspider = Spidermodel.objects.update_or_create(
                        name=item["spider"],
                        link=item.get("url"),
                    )[0]
                comic = Comic.objects.filter(  # type: ignore  # noqa: PGH003
                    Q(title__exact=comictitle) | Q(slug__exact=comicslug),
                )
                if (
                    comic.exists()  # type: ignore  # noqa: PGH003
                ):
                    if images:
                        dbcomic = comic.first()
                        chapter = Chapter.objects.filter(  # type: ignore  # noqa: PGH003
                            Q(slug__exact=slug),
                        )
                        if chapter.exists():
                            msg = f"{slug} - {comictitle} Exists"
                            raise DropItem(
                                msg,
                            )
                        try:
                            newchapter = Chapter.objects.update_or_create(
                                title=title,
                                slug=slug,
                                name=name,
                                spider=oldspider,
                                updated_at=updated_at,
                                numimages=numimages,
                                comic=dbcomic,
                            )[0]
                            for image in images:
                                ChapterImage.objects.update_or_create(
                                    link=image["url"],
                                    image=image["path"],
                                    status=image["status"],
                                    chapter=newchapter,
                                    comic=dbcomic,
                                )[0]

                        except IntegrityError:
                            msg = f"{slug} - {name} Exists"
                            raise DropItem(msg)  # noqa: B904, RUF100

                else:
                    msg = f"{comictitle} Does Not Exists"
                    raise DropItem(
                        msg,
                    )
                return item

        msg = f"DbPipeline Item has a Missing field in: {item!r}"
        raise DropItem(msg)
