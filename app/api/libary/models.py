# models.py
import uuid
from typing import ClassVar

from django.core.validators import FileExtensionValidator
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field

from api.libary.managers import ChapterManager
from api.libary.managers import ComicManager
from api.users.models import User

ext_validator = FileExtensionValidator(
    [
        "ico",
        "jpg",
        "svg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "tiff",
        "ttf",
        "eot",
        "woff",
        "woff2",
    ],
)


def panel_location(instance, filename):
    return "{}/{}/{}".format(
        str(instance.comic.slug)
        .replace(" ", "_")
        .replace(":", " ")
        .replace("/", "")
        .replace("\\", ""),
        instance.chapter.slug,
        filename,
    )


def comic_location(instance, filename):
    return "{}/{}".format(
        str(instance.comic.slug)
        .replace(" ", "_")
        .replace(":", " ")
        .replace("/", "")
        .replace("\\", ""),
        filename,
    )


class Genre(models.Model):
    name = models.CharField(_("Name"), max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "Genres"
        verbose_name = "Genre"

    def __str__(self):
        return self.name

    def get_genre_comics_children(self):
        return self.comicgenre.all()  # type: ignore  # noqa: PGH003


class Author(models.Model):
    name = models.CharField(_("Name"), max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "Authors"
        verbose_name = "Author"

    def __str__(self):
        return self.name

    def get_author_comics_children(self):
        return self.comicauthor.all()  # type: ignore  # noqa: PGH003


class Artist(models.Model):
    name = models.CharField(_("Name"), max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "Artists"
        verbose_name = "Artist"

    def __str__(self):
        return self.name

    def get_artist_comics_children(self):
        return self.comicartist.all()  # type: ignore  # noqa: PGH003


class Category(models.Model):
    name = models.CharField(_("Name"), max_length=7, unique=True)

    class Meta:
        verbose_name_plural = "Categorys"
        verbose_name = "Category"

    def __str__(self):
        return self.name

    def get_category_comics_children(self):
        return self.comiccategory.all()  # type: ignore  # noqa: PGH003


class Comic(models.Model):
    class ComicStatus(models.TextChoices):
        COMPLETED = "completed", "Completed"
        ONGOING = "ongoing", "Ongoing"
        HIATUS = "hiatus", "Hiatus"
        DROPPED = "dropped", "Dropped"
        SEASON_END = "season end", "Season End"
        COMING_SOON = "coming soon", "Coming Soon"

    comic_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(_("Title"), max_length=5000, unique=True)
    slug = models.SlugField(
        _("Slug"),
        max_length=5000,
        unique=True,
        blank=True,
        null=True,
    )
    description = models.TextField(_("Description"), blank=True)
    status = models.CharField(
        _("Status"),
        max_length=15,
        choices=ComicStatus.choices,
        default=ComicStatus.ONGOING,
    )
    rating = models.DecimalField(_("Rating"), max_digits=10, decimal_places=1)
    serialization = models.CharField(
        _("Serialization"),
        max_length=5000,
        blank=True,
    )
    numchapters = models.PositiveIntegerField(
        _("Total Chapters"),
    )
    spider = models.CharField(_("Spider"), max_length=500, blank=True)
    link = models.URLField(
        _("Link"),
        max_length=5000,
        blank=True,
    )
    numimages = models.PositiveIntegerField(_("Total Images"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField()
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="comiccategory",
    )
    genres = models.ManyToManyField(
        Genre,
        blank=True,
        related_name="comicgenre",
    )
    author = models.ForeignKey(
        Author,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="comicauthor",
    )
    artist = models.ForeignKey(
        Artist,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="comicartist",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name="comicuser",
    )
    users = models.ManyToManyField(
        User,
        through="UserItem",
        blank=True,
    )

    objects: ClassVar[ComicManager] = ComicManager()

    class Meta:
        verbose_name_plural = "Comics"
        verbose_name = "Comic"
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.title}"

    def get_absolute_url(self) -> str:
        """Get URL for comic's detail view.

        Returns:
            str: URL for comic detail.

        """
        return reverse("libary:comic_detail", kwargs={"slug": self.slug})

    @property
    def has_chapters(self):
        return self.numchapters > 0

    @property
    def has_images(self):
        return self.numimages > 1

    def get_images(self):
        return self.comicimages.all()  # type: ignore  # noqa: PGH003

    def get_chapters(self):
        return self.comicchapters.all()  # type: ignore  # noqa: PGH003

    def get_comments(self):
        return self.comiccomments.all()  # type: ignore  # noqa: PGH003


class ComicImage(models.Model):
    class ComicImageStatus(models.TextChoices):
        DOWNLOADED = "downloaded"
        UPTODATE = "uptodate"
        CACHED = "cached"

    comic_image_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    link = models.URLField(
        _("Link"),
        max_length=5000,
        blank=True,
    )
    comic = models.ForeignKey(
        Comic,
        on_delete=models.CASCADE,
        related_name="comicimages",
    )
    image = models.ImageField(
        _("Image"),
        upload_to=comic_location,
        validators=[
            ext_validator,
        ],
        max_length=5000,
    )
    status = models.CharField(
        max_length=13,
        choices=ComicImageStatus.choices,
        default=ComicImageStatus.DOWNLOADED,
    )

    class Meta:
        verbose_name_plural = "Comic Images"
        verbose_name = "Comic Image"

    def __str__(self):
        return f"{self.comic.title} - {self.comic_image_id}"


class UserItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="books")
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE, related_name="followers")
    order = models.PositiveIntegerField(
        _("Order"),
    )

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Useritems"
        verbose_name = "Useritem"

    def __str__(self):
        return f"{self.order}: {self.user.pk} - {self.comic.title}"


class Chapter(models.Model):
    chapter_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(_("Name"), max_length=500)
    title = models.CharField(_("Title"), max_length=5000, blank=True)
    slug = models.SlugField(
        _("Slug"),
        max_length=5000,
        unique=True,
        blank=True,
        null=True,
    )
    spider = models.CharField(_("Spider"), max_length=500, blank=True)
    link = models.URLField(
        _("Link"),
        max_length=5000,
        blank=True,
    )
    updated_at = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    numimages = models.PositiveIntegerField(_("Total Images"))
    comic = models.ForeignKey(
        Comic,
        on_delete=models.CASCADE,
        related_name="comicchapters",
    )

    objects: ClassVar[ChapterManager] = ChapterManager()

    class Meta:
        verbose_name_plural = "Chapters"
        verbose_name = "Chapter"
        ordering = ["-updated_at"]
        # unique_together = ["comic", "slug"]  # noqa: ERA001
        # unique_together = ["comic", "name", "title"]  # noqa: ERA001

    def __str__(self):
        return f"{self.comic.title} - {self.name}"

    def get_absolute_url(self) -> str:
        """Get URL for chapter's detail view.

        Returns:
            str: URL for chapter detail.

        """
        return reverse("chapters:detail", kwargs={"chapter_id": self.chapter_id})

    @property
    def has_images(self):
        return self.numimages > 0

    def get_images(self):
        return self.chapterimages.all()  # type: ignore  # noqa: PGH003

    def get_comments(self):
        return self.chaptercomments.all()  # type: ignore  # noqa: PGH003


class ChapterImage(models.Model):
    class ChapterImageStatus(models.TextChoices):
        DOWNLOADED = "downloaded"
        UPTODATE = "uptodate"
        CACHED = "cached"

    chapter_image_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    link = models.URLField(
        _("Link"),
        max_length=5000,
        blank=True,
    )

    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="chapterimages",
    )
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE)
    image = models.ImageField(
        _("Image"),
        upload_to=panel_location,
        validators=[ext_validator],
        max_length=5000,
        null=True,
        blank=True,
    )

    status = models.CharField(
        max_length=13,
        choices=ChapterImageStatus.choices,
        default=ChapterImageStatus.DOWNLOADED,
    )

    class Meta:
        verbose_name_plural = "Chapter Images"
        verbose_name = "Chapter Image"

    def __str__(self):
        return f"{self.comic.title} - {self.chapter.name} - {self.chapter_image_id}"


class Comment(models.Model):
    text = CKEditor5Field("Text", config_name="extends")
    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="chaptercomments",
    )
    comic = models.ForeignKey(
        Comic,
        on_delete=models.CASCADE,
        related_name="comiccomments",
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="usercomments",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Comments"
        verbose_name = "Comment"
        ordering = ["-created_at"]

    def __str__(self):
        return self.text

    def get_chapter_children(self):
        return self.chaptercomments.all()  # type: ignore  # noqa: PGH003

    def get_comic_children(self):
        return self.comiccomments.all()  # type: ignore  # noqa: PGH003
