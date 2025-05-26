import csv
import logging

from api.libary.models import Artist
from api.libary.models import Author
from api.libary.models import Category
from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage
from api.libary.models import Genre
from django.conf import settings
from django.core.management.base import BaseCommand

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generates comics for apps"

    def handle(self, *args, **options):  # noqa: PLR0915
        def save_comics():  # noqa: PLR0915
            # save the data to a CSV file
            base = settings.BASE_DIR
            comic_file = str(base / "comic_data.csv")
            genre_file = str(base / "genre_data.csv")
            author_file = str(base / "author_data.csv")
            artist_file = str(base / "artist_data.csv")
            category_file = str(base / "category_data.csv")
            comic_image_file = str(base / "comic_image_data.csv")
            genres_data = Genre.objects.all().values("name")
            genrekeys = genres_data[0].keys()
            authors_data = Author.objects.all().values("name")
            authorkeys = authors_data[0].keys()
            artists_data = Artist.objects.all().values("name")
            artistkeys = artists_data[0].keys()
            categorys_data = Category.objects.all().values("name")
            categorykeys = categorys_data[0].keys()
            mycomics_data = []
            comics = Comic.objects.all()
            for comic in comics:
                genres = comic.genres.all()
                if genres:
                    item = {
                        "title": comic.title,
                        "slug": comic.slug,
                        "description": comic.description,
                        "rating": comic.rating,
                        "numchapters": comic.numchapters,
                        "numimages": comic.numimages,
                        "updated_at": comic.updated_at,
                        "serialization": comic.serialization,
                        "status": comic.status,
                        "link": comic.link,
                        "category": comic.category.id,
                        "author": comic.author.id,
                        "artist": comic.artist.id,
                        "genres": [genre.name for genre in genres],
                    }
                else:
                    item = {
                        "title": comic.title,
                        "slug": comic.slug,
                        "description": comic.description,
                        "rating": comic.rating,
                        "numchapters": comic.numchapters,
                        "numimages": comic.numimages,
                        "updated_at": comic.updated_at,
                        "serialization": comic.serialization,
                        "status": comic.status,
                        "link": comic.link,
                        "category": comic.category.id,
                        "author": comic.author.id,
                        "artist": comic.artist.id,
                        "genres": ["_"],
                    }

                mycomics_data.append(item)

            comickeys = mycomics_data[0].keys()

            comic_images_data = (
                ComicImage.objects.all()
                .values(
                    "status",
                    "link",
                    "image",
                    "checksum",
                    "comic",
                )
                .distinct()
            )
            comicimagekeys = comic_images_data[0].keys()

            with open(  # noqa: PTH123
                genre_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=genrekeys)
                dict_writer.writeheader()
                dict_writer.writerows(genres_data)
                logger.info("Genre CSV created successfully")
            with open(  # noqa: PTH123
                artist_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=artistkeys)
                dict_writer.writeheader()
                dict_writer.writerows(artists_data)
                logger.info("Artist CSV created successfully")
            with open(  # noqa: PTH123
                author_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=authorkeys)
                dict_writer.writeheader()
                dict_writer.writerows(authors_data)
                logger.info("Author CSV created successfully")
            with open(  # noqa: PTH123
                category_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=categorykeys)
                dict_writer.writeheader()
                dict_writer.writerows(categorys_data)
                logger.info("Category CSV created successfully")
            with open(  # noqa: PTH123
                comic_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=comickeys)
                dict_writer.writeheader()
                for row in mycomics_data:

                    dict_writer.writerow(row)
                logger.info("Comic CSV created successfully")
            with open(  # noqa: PTH123
                comic_image_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=comicimagekeys)
                dict_writer.writeheader()
                dict_writer.writerows(comic_images_data)
                logger.info("Comic image CSV created successfully")

        def save_chapters():
            # save the data to a CSV file
            base = settings.BASE_DIR
            chapter_file = str(base / "chapter_data.csv")
            chapter_image_file = str(base / "chapter_image_data.csv")
            chapters_data = (
                Chapter.objects.all()
                .values(
                    "name",
                    "title",
                    "slug",
                    "link",
                    "numimages",
                    "updated_at",
                    "comic",
                )
                .distinct()
            )
            chapterkeys = chapters_data[0].keys()

            chapter_images_data = (
                ChapterImage.objects.all()
                .values(
                    "status",
                    "link",
                    "image",
                    "checksum",
                    "chapter",
                    "comic",
                )
                .distinct()
            )
            chapterimagekeys = chapter_images_data[0].keys()

            with open(  # noqa: PTH123
                chapter_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=chapterkeys)
                dict_writer.writeheader()
                dict_writer.writerows(chapters_data)
                logger.info("CSV created successfully")
            with open(  # noqa: PTH123
                chapter_image_file,
                "w",
                newline="",
                encoding="utf-8",
            ) as output_file:
                dict_writer = csv.DictWriter(output_file, fieldnames=chapterimagekeys)
                dict_writer.writeheader()
                dict_writer.writerows(chapter_images_data)
                logger.info("CSV created successfully")

        def load():

            save_comics()

            save_chapters()

        def main():
            load()

        main()
