from typing import ClassVar

from django.core.validators import FileExtensionValidator
from django.db import models

# from django.db.models import Q  # noqa: ERA001
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


def chapter_image_location(instance, filename):
    return "{}/{}/{}".format(
        str(instance.comic.slug)
        .replace(" ", "_")
        .replace(":", " ")
        .replace("/", "")
        .replace("\\", ""),
        instance.chapter.slug,
        filename,
    )


def comic_image_location(instance, filename):
    return "{}/{}".format(
        str(instance.comic.slug)
        .replace(" ", "_")
        .replace(":", " ")
        .replace("/", "")
        .replace("\\", ""),
        filename,
    )


class Genre(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name

    def get_comics_children(self):
        return self.genrecomics.all()  # type: ignore  # noqa: PGH003


class Author(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True, unique=True)

    def __str__(self):
        return self.name

    def get_comics_children(self):
        return self.authorcomics.all()  # type: ignore  # noqa: PGH003


class Artist(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True, unique=True)

    def __str__(self):
        return self.name

    def get_comics_children(self):
        return self.artistcomics.all()  # type: ignore  # noqa: PGH003


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name

    def get_comics_children(self):
        return self.categorycomics.all()  # type: ignore  # noqa: PGH003


class Website(models.Model):
    name = models.CharField(max_length=200)
    link = models.URLField(
        default="",
    )

    def __str__(self):
        return self.name

    def get_spider_comics_children(self):
        return self.websitecomics.all()  # type: ignore  # noqa: PGH003

    def get_spider_chapters_children(self):
        return self.websitechapters.all()  # type: ignore  # noqa: PGH003


class Comic(models.Model):
    class ComicStatus(models.TextChoices):
        COMPLETED = "completed", "Completed"
        ONGOING = "ongoing", "Ongoing"
        HIATUS = "hiatus", "Hiatus"
        DROPPED = "dropped", "Dropped"
        SEASON_END = "season end", "Season End"
        COMING_SOON = "coming soon", "Coming Soon"

    title = models.CharField(_("Title"), max_length=5000, unique=True)
    slug = models.SlugField(_("Slug"), max_length=5000, blank=True, unique=True)
    description = CKEditor5Field("Description", config_name="extends")
    status = models.CharField(_("Status"), max_length=15, choices=ComicStatus.choices)
    rating = models.DecimalField(_("Rating"), max_digits=10, decimal_places=1)
    updated_at = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    numchapters = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )
    numimages = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )
    serialization = models.CharField(
        _("Serialization"),
        max_length=5000,
        blank=True,
    )
    website = models.ForeignKey(
        Website,
        on_delete=models.CASCADE,
        related_name="websitecomics",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="categorycomics",
    )
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name="authorcomics",
        null=True,
        blank=True,
    )
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name="artistcomics",
        null=True,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    genres = models.ManyToManyField(
        Genre,
        blank=True,
        related_name="genrecomics",
    )
    users = models.ManyToManyField(
        User,
        blank=True,
        related_name="usercomics",
    )

    objects: ClassVar[ComicManager] = ComicManager()

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return self.title

    def get_absolute_url(self) -> str:
        """Get URL for comic's detail view.

        Returns:
            str: URL for comic detail.

        """
        return reverse("comics:detail", kwargs={"slug": self.slug})

    def get_update_url(self) -> str:
        """Get URL for comic's update view.

        Returns:
            str: URL for comic update.

        """
        return reverse("comics:update", kwargs={"slug": self.slug})

    def get_delete_url(self) -> str:
        """Get URL for comic's delete view.

        Returns:
            str: URL for comic delete.

        """
        return reverse("comics:delete", kwargs={"slug": self.slug})

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


class Chapter(models.Model):
    website = models.ForeignKey(
        Website,
        on_delete=models.CASCADE,
        related_name="websitechapters",
    )
    comic = models.ForeignKey(
        Comic,
        on_delete=models.CASCADE,
        related_name="comicchapters",
    )
    name = models.CharField(max_length=500)
    slug = models.SlugField(
        _("Slug"),
        max_length=5000,
        unique=True,
        blank=True,
    )
    title = models.CharField(_("Title"), max_length=5000, blank=True)
    updated_at = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    numimages = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )

    objects: ClassVar[ChapterManager] = ChapterManager()

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return self.name

    def get_absolute_url(self) -> str:
        """Get URL for chapter's detail view.

        Returns:
            str: URL for chapter detail.

        """
        return reverse("chapters:detail", kwargs={"slug": self.slug})

    def get_update_url(self) -> str:
        """Get URL for chapter's update view.

        Returns:
            str: URL for chapter update.

        """
        return reverse("chapters:update", kwargs={"slug": self.slug})

    def get_delete_url(self) -> str:
        """Get URL for chapter's delete view.

        Returns:
            str: URL for chapter delete.

        """
        return reverse("chapters:delete", kwargs={"slug": self.slug})

    @property
    def has_images(self):
        return self.numimages > 0

    def get_images(self):
        return self.chapterimages.all()  # type: ignore  # noqa: PGH003

    def get_comments(self):
        return self.chaptercomments.all()  # type: ignore  # noqa: PGH003


class ComicImage(models.Model):
    class ComicImageStatus(models.TextChoices):
        DOWNLOADED = "downloaded"
        UPTODATE = "uptodate"
        CACHED = "cached"

    link = models.URLField(
        default="",
    )
    comic = models.ForeignKey(
        Comic,
        on_delete=models.CASCADE,
        related_name="comicimages",
    )
    image = models.ImageField(
        upload_to=comic_image_location,
        validators=[
            ext_validator,
        ],
    )
    status = models.CharField(
        max_length=13,
        choices=ComicImageStatus.choices,
    )
    checksum = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.image}"


class ChapterImage(models.Model):
    class ChapterImageStatus(models.TextChoices):
        DOWNLOADED = "downloaded"
        UPTODATE = "uptodate"
        CACHED = "cached"

    link = models.URLField(
        default="",
    )
    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="chapterimages",
    )
    comic = models.ForeignKey(
        Comic,
        on_delete=models.CASCADE,
        related_name="comicchapterimages",
    )
    image = models.ImageField(
        upload_to=chapter_image_location,
        validators=[
            ext_validator,
        ],
    )
    status = models.CharField(
        max_length=13,
        choices=ChapterImageStatus.choices,
    )
    checksum = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.image}"


class Comment(models.Model):
    text = CKEditor5Field("Text", config_name="extends")
    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="chaptercomments",
        blank=True,
        null=True,
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

    def __str__(self):
        return self.text

    def get_chapter_children(self):
        return self.chaptercomments.all()  # type: ignore  # noqa: PGH003

    def get_comic_children(self):
        return self.comiccomments.all()  # type: ignore  # noqa: PGH003
