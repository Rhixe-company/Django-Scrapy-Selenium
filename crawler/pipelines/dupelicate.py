from django.contrib.auth import get_user_model
from django.db.models import Q
from itemadapter.adapter import ItemAdapter
from scrapy.exceptions import DropItem

from api.apps.models import Artist
from api.apps.models import Author
from api.apps.models import Category
from api.apps.models import Chapter
from api.apps.models import ChapterImage
from api.apps.models import Comic
from api.apps.models import ComicImage


class CrawlerDupelicatePipeline:

    def process_item(self, item, spider):  # noqa: C901, PLR0915
        adapter = ItemAdapter(item)
        if adapter.get("images"):
            if adapter.get("images") and adapter.get("slug"):
                comquery = Q(slug__exact=item["title"]) | Q(title__exact=item["title"])
                if (
                    Comic.objects.filter(comquery)
                    .prefetch_related(
                        "comicitems",
                        "genres",
                        "followers",
                        "comicchapters",
                    )
                    .select_related("user", "author", "category", "artist")
                    .exists()
                ):
                    comic = (
                        Comic.objects.filter(comquery)
                        .prefetch_related(
                            "comicitems",
                            "genres",
                            "followers",
                            "comicchapters",
                        )
                        .select_related("user", "author", "category", "artist")
                        .first()
                    )
                    images = item.get("images")
                    title = item["title"]
                    slug = item["slug"]
                    description = item.get("description")
                    rating = item["rating"]
                    status = item["status"]
                    url = item["url"]
                    spider = item["spider"]
                    updated_at = item["updated_at"]
                    numchapters = comic.get_chapters_children().count()  # type: ignore  # noqa: PGH003
                    numitems = comic.get_comic_images_children().count()  # type: ignore  # noqa: PGH003
                    serialization = item["serialization"]
                    ca = item.get("type")
                    author = item.get("author", "")
                    artist = item.get("artist", "")
                    nwca = Category.objects.get(name=ca)
                    nwar = Artist.objects.filter(name=artist).first()
                    nwau = Author.objects.filter(name=author).first()
                    usermodel = get_user_model()
                    user = usermodel.objects.filter(
                        Q(email__icontains="admin@rhixe.company")
                        | Q(username__icontains="adminbot"),
                    ).first()
                    if not user:
                        user = usermodel.objects.create_superuser(
                            email="admin@rhixe.company",
                            username="adminbot",
                            password="R4I7gcJHX",  # noqa: S106
                        )
                    if images:

                        comquery = Q(slug__exact=slug) | Q(title__exact=title)
                        Comic.objects.filter(
                            comquery,
                        ).update(
                            description=description,
                            url=url,
                            spider=spider,
                            numchapters=numchapters,
                            numitems=numitems,
                            serialization=serialization,
                            rating=rating,
                            status=status,
                            updated_at=updated_at,
                            category=nwca,
                            artist=nwar,
                            author=nwau,
                            user=user,
                        )
                        for comicimg in images:
                            link = comicimg["url"]
                            image = comicimg["path"]

                            ComicImage.objects.filter(
                                Q(image=image) | Q(url__iexact=link),
                            ).update_or_create(url=link, image=image, comic=comic)
                    msg2 = f"ComicItem Already Exists:{item!r}"
                    raise DropItem(msg2)
                return item
            if (
                adapter.get("images")
                and adapter.get("comicslug")
                and adapter.get("chapterslug")
            ):
                chapterquery = Q(slug__exact=item["chapterslug"])
                if (
                    Chapter.objects.prefetch_related("chapteritems")
                    .select_related("comic")
                    .filter(chapterquery)
                    .exists()
                ):
                    chapter = (
                        Chapter.objects.prefetch_related("chapteritems")
                        .select_related("comic")
                        .filter(chapterquery)
                        .first()
                    )
                    chapterimages = item.get("images")
                    comicslug = item["comicslug"]
                    comictitle = item["comictitle"]
                    name = item["chaptername"]
                    title = item.get("chaptertitle", "")
                    slug = item["chapterslug"]
                    url = item["url"]
                    spider = item["spider"]
                    updated_at = item.get("updated_at")
                    numpages = chapter.get_chapter_images_children().count()  # type: ignore  # noqa: PGH003
                    comicquery = Q(slug__exact=comicslug) | Q(
                        title__exact=comictitle,
                    )
                    if (
                        Comic.objects.prefetch_related(
                            "comicitems",
                            "comicchapters",
                            "genres",
                            "followers",
                        )
                        .select_related("author", "category", "artist", "user")
                        .filter(comicquery)
                        .exists()
                    ):

                        if chapterimages:
                            comic = (
                                Comic.objects.prefetch_related(
                                    "comicitems",
                                    "comicchapters",
                                    "genres",
                                    "followers",
                                )
                                .select_related("author", "category", "artist", "user")
                                .filter(comicquery)
                                .first()
                            )
                            Chapter.objects.filter(
                                chapterquery,
                            ).update(
                                title=title,
                                url=url,
                                spider=spider,
                                numpages=numpages,
                                name=name,
                                updated_at=updated_at,
                                comic=comic,
                            )
                            for img in chapterimages:
                                cimage = img["path"]
                                clink = img["url"]
                                panelquery = Q(image=cimage) | Q(url__iexact=clink)

                                ChapterImage.objects.filter(
                                    panelquery,
                                ).update_or_create(
                                    url=clink,
                                    image=cimage,
                                    chapter=chapter,
                                    comic=comic,
                                )
                    msg3 = f"ChapterItem Already Exists:{item!r}"
                    raise DropItem(msg3)
                return item
            return None

        msg5 = f"CrawlerDupelicatePipeline Item has a Missing field:{item!r}"
        raise DropItem(
            msg5,
        )
