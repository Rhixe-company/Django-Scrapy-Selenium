import logging

from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned
from django.db.models import Q
from django.db.utils import IntegrityError
from itemadapter.adapter import ItemAdapter
from scrapy.exceptions import DropItem

from project.libary.forms import ArtistForm
from project.libary.forms import AuthorForm
from project.libary.forms import CategoryForm
from project.libary.forms import ChapterForm
from project.libary.forms import ComicForm
from project.libary.forms import GenreForm
from project.libary.models import Artist
from project.libary.models import Author
from project.libary.models import Category
from project.libary.models import Chapter
from project.libary.models import ChapterImage
from project.libary.models import Comic
from project.libary.models import ComicImage

logger = logging.getLogger(__name__)


class CrawlerAppsDbFormPipeline:
    def process_item(self, item, spider):  # noqa: C901, PLR0912, PLR0915
        adapter = ItemAdapter(item)
        if adapter.get("images"):
            if adapter.get("images") and adapter.get("slug"):
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
                images = item.get("images")
                title = item["title"]
                slug = item["slug"]
                description = item.get("description")
                rating = item["rating"]
                status = item["status"]
                url = item["url"]
                spider = item["spider"]
                updated_at = item["updated_at"]
                numchapters = item["numchapters"]
                numitems = len(images)
                serialization = item["serialization"]
                ca = item.get("type")
                author = item.get("author")
                artist = item.get("artist")
                genres = item.get("genres")
                if images:
                    authorform = AuthorForm(
                        {
                            "name": author,
                        },
                    )
                    artistform = ArtistForm(
                        {
                            "name": artist,
                        },
                    )
                    categoryform = CategoryForm(
                        {
                            "name": ca,
                        },
                    )
                    if authorform.is_bound is True:
                        if authorform.is_valid():
                            authorform.save()
                    if artistform.is_bound is True:
                        if artistform.is_valid():
                            artistform.save()
                    gens = []
                    if genres:
                        for gen in genres:
                            genreform = GenreForm(
                                {
                                    "name": gen,
                                },
                            )
                            if genreform.is_bound is True:
                                if genreform.is_valid():
                                    g = genreform.save()
                                    gens.append(g.pk)
                    if categoryform.is_bound is True:
                        if categoryform.is_valid():
                            categoryform.save()
                    nwca = Category.objects.get(name=ca)
                    nwar = Artist.objects.get(name=artist)
                    nwau = Author.objects.get(name=author)
                    comic_data = {
                        "title": title,
                        "slug": slug,
                        "description": description,
                        "rating": rating,
                        "status": status,
                        "url": url,
                        "spider": spider,
                        "updated_at": updated_at,
                        "numchapters": numchapters,
                        "numitems": numitems,
                        "serialization": serialization,
                        "category": nwca,
                        "author": nwau,
                        "artist": nwar,
                        "genres": gens,
                    }
                    comicform = ComicForm(comic_data)
                    if comicform.is_bound is True:
                        try:
                            if comicform.is_valid():
                                newcomic = comicform.save(commit=False)
                                newcomic.user = user
                                newcomic.save()
                                comicform.save_m2m()
                                msg2 = f"Creating - {newcomic.slug}"
                                logger.info(msg2)
                        except IntegrityError:
                            msg3 = f"Dropping - {title}"
                            raise DropItem(msg3)  # noqa: B904
                    for comicimg in images:
                        link = comicimg["url"]
                        image = comicimg["path"]
                        comquery = Q(slug__exact=slug) | Q(title__exact=title)
                        try:
                            oldcomic = Comic.objects.get(comquery)
                        except MultipleObjectsReturned:
                            oldcomic = Comic.objects.filter(comquery).first()
                        ComicImage.objects.filter(
                            Q(image=image) | Q(url__iexact=link),
                        ).update_or_create(url=link, image=image, comic=oldcomic)[0]
                return item
            if (
                adapter.get("images")
                and adapter.get("comicslug")
                and adapter.get("chapterslug")
            ):
                chapterimages = item.get("images")
                comicslug = item["comicslug"]
                comictitle = item["comictitle"]
                name = item["chaptername"]
                title = item.get("chaptertitle", "")
                slug = item["chapterslug"]
                url = item["url"]
                spider = item["spider"]
                updated_at = item.get("updated_at")
                numpages = len(chapterimages)
                chapterquery = Q(slug__exact=slug) | Q(comic__slug__exact=comicslug)
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
                        try:
                            dbcomic = (
                                Comic.objects.prefetch_related(
                                    "comicitems",
                                    "comicchapters",
                                    "genres",
                                    "followers",
                                )
                                .select_related("author", "category", "artist", "user")
                                .get(comicquery)
                            )
                        except MultipleObjectsReturned:
                            dbcomic = Comic.objects.filter(comicquery).first()

                        chapter_data = {
                            "title": title,
                            "slug": slug,
                            "name": name,
                            "url": url,
                            "spider": spider,
                            "updated_at": updated_at,
                            "numpages": numpages,
                            "comic": dbcomic,
                        }
                        chapterform = ChapterForm(chapter_data)
                        if chapterform.is_bound is True:
                            try:
                                if chapterform.is_valid():
                                    chapter = chapterform.save(commit=False)
                                    chapter.save()
                                    msg3 = f"Creating - {chapter.slug}"
                                    logger.info(msg3)
                            except IntegrityError:
                                msg3 = f"Dropping - {slug}"
                                logger.info(msg3)

                                # cimgs = []  # noqa: ERA001
                            for image in chapterimages:
                                try:
                                    dbchapter = (
                                        Chapter.objects.prefetch_related("chapteritems")
                                        .select_related("comic")
                                        .get(chapterquery)
                                    )
                                except MultipleObjectsReturned:
                                    dbchapter = (
                                        Chapter.objects.prefetch_related("chapteritems")
                                        .select_related("comic")
                                        .filter(chapterquery)
                                        .first()
                                    )
                                newurl = image["url"]
                                newimage = image["path"]
                                # cimgs.append(newimage)  # noqa: ERA001
                                ChapterImage.objects.filter(
                                    Q(image__iexact=newimage) | Q(url__iexact=newurl),
                                ).update_or_create(
                                    url=newurl,
                                    image=newimage,
                                    chapter=dbchapter,
                                    comic=dbchapter.comic,
                                )[0]
                                # chapter_images = ChapterImage.objects.filter(  # noqa: E501, ERA001, RUF100
                                #     Q(chapter=chapter)  # noqa: ERA001
                                # ).filter(Q(image__in=cimgs))
                                # msg = {  # noqa: ERA001, RUF100
                                #     "chapter_slug": chapter.slug,  # noqa: ERA001
                                #     "chapter_numpages": chapter.numpages,  # noqa: E501, ERA001
                                #     "images": chapter_images,  # noqa: ERA001
                                #     "images_count": chapter_images.count(),  # noqa: E501, ERA001
                                # }  # noqa: ERA001, RUF100
                                # raise DropItem(msg)  # noqa: ERA001
                    else:
                        msg4 = f"{slug} Has No Images"
                        raise DropItem(
                            msg4,
                        )
                else:
                    msg4 = f"{comicslug} Does Not Exists"
                    raise DropItem(
                        msg4,
                    )
                return item
            return None
        msg = f"CrawlerAppsDbFormPipeline Item has a Missing field in: {item!r}"
        raise DropItem(msg)
