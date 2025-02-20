import logging

from django.contrib.auth import get_user_model
from django.db.models import Q
from itemadapter.adapter import ItemAdapter
from scrapy.exceptions import DropItem

from api.apps.forms import ArtistForm
from api.apps.forms import AuthorForm
from api.apps.forms import CategoryForm
from api.apps.forms import ChapterForm
from api.apps.forms import ComicForm
from api.apps.forms import GenreForm
from api.apps.models import Artist
from api.apps.models import Author
from api.apps.models import Category
from api.apps.models import Chapter
from api.apps.models import ChapterImage
from api.apps.models import Comic
from api.apps.models import ComicImage

logger = logging.getLogger(__name__)


class CrawlerAppsDbFormPipeline:
    def process_item(self, item, spider):  # noqa: C901, PLR0912, PLR0915
        adapter = ItemAdapter(item)
        if adapter.get("images"):
            if adapter.get("images") and adapter.get("slug"):
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
                    usermodel = get_user_model()
                    user = usermodel.objects.filter(
                        Q(email__exact="admin@rhixe.company")
                        | Q(username__exact="adminbot"),
                    ).first()
                    if not user:
                        user = usermodel.objects.create_superuser(
                            email="admin@rhixe.company",
                            username="adminbot",
                            password="R4I7gcJHX",  # noqa: S106
                        )
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
                    if genres:
                        gens = []
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
                    nwar = Artist.objects.filter(name=artist).first()
                    nwau = Author.objects.filter(name=author).first()
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
                        if comicform.is_valid():
                            newcomic = comicform.save(commit=False)
                            newcomic.user = user
                            newcomic.save()
                            comicform.save_m2m()
                    for comicimg in images:
                        link = comicimg["url"]
                        image = comicimg["path"]
                        oldcomicc = Comic.objects.filter(
                            Q(title__exact=title) | Q(slug__exact=slug),
                        ).first()
                        ComicImage.objects.filter(
                            Q(image=image) | Q(url__iexact=link),
                        ).get_or_create(url=link, image=image, comic=oldcomicc)[0]
                else:
                    msg4 = f"{slug} has no images!!"
                    raise DropItem(msg4)
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
                chapterquery = Q(slug__exact=slug)
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
                        comicobj = (
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
                        chapter_data = {
                            "title": title,
                            "slug": slug,
                            "name": name,
                            "url": url,
                            "spider": spider,
                            "updated_at": updated_at,
                            "numpages": numpages,
                            "comic": comicobj,
                        }
                        chapterform = ChapterForm(chapter_data)
                        if chapterform.is_bound is True:
                            if chapterform.is_valid():
                                chapter = chapterform.save(commit=False)
                                chapter.save()
                        for chapterimg in chapterimages:
                            clink = chapterimg["url"]
                            cimage = chapterimg["path"]
                            oldchapterr = (
                                Chapter.objects.prefetch_related("chapteritems")
                                .select_related("comic")
                                .get(chapterquery)
                            )
                            # oldimg = ChapterImage.objects.filter(  # noqa: E501, ERA001, RUF100
                            #     ~Q(image__exact=oldchapterr.slug)  # noqa: ERA001
                            #     & ~Q(image=cimage)
                            #     & Q(chapter=oldchapterr),
                            # ).distinct()
                            # if oldimg.exists():
                            #     msg = f"{list(oldimg.values())} exists!!"  # noqa: E501, ERA001
                            #     logger.info(msg)  # noqa: ERA001
                            ChapterImage.objects.filter(
                                Q(image=cimage) | Q(url__iexact=clink),
                            ).get_or_create(
                                url=clink,
                                image=cimage,
                                chapter=oldchapterr,
                                comic=comicobj,
                            )[
                                0
                            ]
                    else:
                        msg5 = f"{slug} has not images"
                        raise DropItem(
                            msg5,
                        )
                else:
                    msg6 = f"{comicslug} Does not Exists"
                    raise DropItem(
                        msg6,
                    )
                return item
            return None
        msg = f"CrawlerAppsDbFormPipeline Item has a Missing field in: {item!r}"
        raise DropItem(msg)
