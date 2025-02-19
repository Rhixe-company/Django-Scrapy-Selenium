import logging

from django.contrib.auth import get_user_model
from django.db.models import Q
from itemadapter.adapter import ItemAdapter
from scrapy.exceptions import DropItem

from api.apps.forms import ArtistForm
from api.apps.forms import AuthorForm
from api.apps.forms import ChapterForm
from api.apps.forms import ComicForm
from api.apps.forms import GenreForm
from api.apps.forms import TypeForm
from api.apps.models import Artist
from api.apps.models import Author
from api.apps.models import Chapter
from api.apps.models import ChapterImage
from api.apps.models import Comic
from api.apps.models import ComicImage

logger = logging.getLogger(__name__)


class CrawlerAppsDbFormPipeline:
    def process_item(self, item, spider):  # noqa: C901, PLR0915

        def save_comics(comicobject):  # noqa: C901, PLR0912, PLR0915
            images = comicobject.get("images")
            title = comicobject["title"]
            slug = comicobject["slug"]
            description = comicobject.get("description")
            rating = comicobject["rating"]
            status = comicobject["status"]
            url = comicobject["url"]
            spider = comicobject["spider"]
            updated_at = comicobject["updated_at"]
            numchapters = comicobject["numchapters"]
            numitems = len(images)
            serialization = comicobject["serialization"]
            te = comicobject.get("type")
            author = comicobject.get("author", "none")
            artist = comicobject.get("artist", "none")
            genres = comicobject.get("genres", "none")
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
            typeform = TypeForm(
                {
                    "name": te.lower(),
                },
            )
            if authorform.is_bound is True:
                if authorform.is_valid():
                    authorform.save()
            if artistform.is_bound is True:
                if artistform.is_valid():
                    artistform.save()
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
            if typeform.is_bound is True:
                if typeform.is_valid():
                    nwte = typeform.save()
                    nwar = Artist.objects.get(name=artist)
                    nwau = Author.objects.get(name=author)
                    comic_data = {
                        "title": title,
                        "slug": slug,
                        "description": description,
                        "rating": rating,
                        "status": status.lower(),
                        "url": url,
                        "spider": spider,
                        "updated_at": updated_at,
                        "numchapters": numchapters,
                        "numitems": numitems,
                        "serialization": serialization,
                        "type": nwte,
                        "author": nwau,
                        "artist": nwar,
                        "genres": gens,
                    }
                    oldcomic = Comic.objects.filter(
                        Q(title__icontains=title) | Q(slug__icontains=slug),
                    ).first()
                    comicform = ComicForm(comic_data)
                    if comicform.is_bound is True:
                        if comicform.is_valid():
                            newcomic = comicform.save(commit=False)
                            newcomic.user = user
                            newcomic.save()
                            comicform.save_m2m()
                            msg1 = f"{newcomic.title} has been created!!"
                            logger.info(msg1)
                        else:
                            oldcomic.description = description
                            oldcomic.rating = rating
                            oldcomic.status = status
                            oldcomic.url = url
                            oldcomic.spider = spider
                            oldcomic.url = url
                            oldcomic.updated_at = updated_at
                            oldcomic.numchapters = numchapters
                            oldcomic.numitems = numitems
                            oldcomic.serialization = serialization
                            oldcomic.type = nwte
                            oldcomic.author = nwau
                            oldcomic.artist = nwar
                            oldcomic.save()
                            msg2 = f"{oldcomic.title} has been updated!!"
                            raise DropItem(msg2)
                    if images:
                        for comicimg in images:
                            link = comicimg["url"]
                            image = comicimg["path"]
                            oldcomicc = Comic.objects.filter(
                                Q(title__icontains=title) | Q(slug__icontains=slug),
                            ).first()
                            ComicImage.objects.filter(
                                Q(image=image) | Q(url__iexact=link),
                            ).update_or_create(
                                url=link,
                                image=image,
                                comic=oldcomicc,
                            )[
                                0
                            ]
                    else:
                        msg4 = f"{slug} has no images!!"
                        raise DropItem(msg4)

        def save_chapters(chapterobject):
            chapterimages = chapterobject.get("images")
            comicslug = chapterobject["comicslug"]
            comictitle = chapterobject["comictitle"]
            name = chapterobject["chaptername"]
            title = chapterobject.get("chaptertitle", "")
            slug = chapterobject["chapterslug"]
            url = chapterobject["url"]
            spider = chapterobject["spider"]
            updated_at = chapterobject.get("updated_at")
            numpages = len(chapterimages)

            comicquery = Q(slug__icontains=comicslug) | Q(
                title__icontains=comictitle,
            )
            comicobj = (
                Comic.objects.prefetch_related(
                    "comicitems",
                    "comicchapters",
                    "genres",
                    "followers",
                )
                .select_related("author", "type", "artist", "user")
                .filter(comicquery)
            )
            if comicobj.exists():
                chapterquery = (
                    Q(slug__icontains=slug)
                    | Q(name__icontains=name)
                    | Q(comic__slug__exact=comicobj.first().slug)
                )
                if chapterimages:
                    chapter_data = {
                        "title": title,
                        "slug": slug,
                        "name": name,
                        "url": url,
                        "spider": spider,
                        "updated_at": updated_at,
                        "numpages": numpages,
                    }
                    oldchapter = (
                        Chapter.objects.prefetch_related("chapteritems")
                        .select_related("comic")
                        .filter(chapterquery)
                        .first()
                    )
                    chapterform = ChapterForm(chapter_data)
                    if chapterform.is_bound is True:
                        if chapterform.is_valid():
                            chapterdbcomic = (
                                Comic.objects.prefetch_related(
                                    "comicitems",
                                    "comicchapters",
                                    "genres",
                                    "followers",
                                )
                                .select_related("author", "type", "artist", "user")
                                .filter(comicquery)
                                .first()
                            )
                            chapter = chapterform.save(commit=False)
                            chapter.comic = chapterdbcomic
                            chapter.save()
                        else:
                            chapterdbcomicc = (
                                Comic.objects.prefetch_related(
                                    "comicitems",
                                    "comicchapters",
                                    "genres",
                                    "followers",
                                )
                                .select_related("author", "type", "artist", "user")
                                .filter(comicquery)
                                .first()
                            )
                            oldchapter.comic = chapterdbcomicc
                            oldchapter.title = title
                            oldchapter.spider = spider
                            oldchapter.url = url
                            oldchapter.updated_at = updated_at
                            oldchapter.numpages = numpages
                            oldchapter.save()
                            msg2 = f"{oldchapter.slug} has been updated!!"
                            raise DropItem(msg2)
                    for chapterimg in chapterimages:
                        clink = chapterimg["url"]
                        cimage = chapterimg["path"]
                        oldchapterr = (
                            Chapter.objects.prefetch_related("chapteritems")
                            .select_related("comic")
                            .filter(chapterquery)
                            .first()
                        )
                        oldimg = (
                            ChapterImage.objects.filter(  # noqa: E501, ERA001, RUF100
                                ~Q(image__icontains=oldchapterr.slug)
                            ).filter(  # noqa: E501, ERA001, RUF100
                                chapter=oldchapterr,
                            )
                        )
                        if oldimg.exists():
                            msg = f"{oldimg.first().image.url} exists!!"
                            raise DropItem(msg)
                        ChapterImage.objects.filter(
                            Q(image=cimage) | Q(url__iexact=clink),
                        ).update_or_create(
                            url=clink,
                            image=cimage,
                            chapter=oldchapterr,
                            comic=oldchapterr.comic,
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

        adapter = ItemAdapter(item)
        if adapter.get("images"):
            if adapter.get("images") and adapter.get("slug"):
                save_comics(comicobject=item)
                return item
            if (
                adapter.get("images")
                and adapter.get("comicslug")
                and adapter.get("chapterslug")
            ):
                save_chapters(chapterobject=item)
                return item
            return None
        msg = f"CrawlerAppsDbFormPipeline Item has a Missing field in: {item!r}"
        raise DropItem(msg)
