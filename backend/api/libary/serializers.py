from django.db.models import Q
from rest_framework import serializers

from api.libary.models import Artist
from api.libary.models import Author
from api.libary.models import Category
from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage
from api.libary.models import Comment
from api.libary.models import Genre
from api.libary.models import UserComic
from api.users.serializers import UserSerializer


class UserComicSerializer(serializers.ModelSerializer[UserComic]):
    user = UserSerializer()

    class Meta:
        model = UserComic
        fields = [
            "user",
            "comic",
        ]


class ArtistSerializer(serializers.ModelSerializer[Artist]):

    class Meta:
        model = Artist
        fields = [
            "name",
            "id",
        ]


class AuthorSerializer(serializers.ModelSerializer[Author]):

    class Meta:
        model = Author
        fields = [
            "name",
            "id",
        ]


class CategorySerializer(serializers.ModelSerializer[Category]):

    class Meta:
        model = Category
        fields = [
            "name",
            "id",
        ]


class GenreSerializer(serializers.ModelSerializer[Genre]):

    class Meta:
        model = Genre
        fields = [
            "name",
            "id",
        ]


class CommentSerializer(serializers.ModelSerializer[Comment]):

    class Meta:
        model = Comment
        fields = [
            "text",
            "chapter",
            "comic",
            "user",
            "id",
        ]


class ComicImageSerializer(serializers.ModelSerializer[ComicImage]):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ComicImage
        fields = [
            "link",
            "image",
            "status",
            "checksum",
            "comic",
        ]


class ChapterImageSerializer(serializers.ModelSerializer[ChapterImage]):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ChapterImage
        fields = [
            "link",
            "image",
            "status",
            "checksum",
            "chapter",
            "comic",
        ]


class ComicSerializer(serializers.ModelSerializer[Comic]):
    updated_at = serializers.DateField(format="%d %B, %Y")
    rating = serializers.DecimalField(max_digits=10, decimal_places=1)
    images = serializers.SerializerMethodField(read_only=True)
    first_chapter = serializers.SerializerMethodField(read_only=True)
    last_chapter = serializers.SerializerMethodField(read_only=True)
    # updated_at = serializers.DateField(format="%Y-%m-%dT%H:%M:%S")  # noqa: ERA001

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ComicImageSerializer(items, many=True)
        return serializer.data

    def get_first_chapter(self, obj):
        items = obj.get_chapters().last()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    def get_last_chapter(self, obj):
        items = obj.get_chapters().first()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    class Meta:
        model = Comic
        fields = [
            "title",
            "slug",
            "description",
            "rating",
            "numchapters",
            "numimages",
            "updated_at",
            "serialization",
            "status",
            "link",
            "images",
            "first_chapter",
            "last_chapter",
        ]


class ChapterSerializer(serializers.ModelSerializer[Chapter]):
    updated_at = serializers.DateField(format="%d %B, %Y")

    class Meta:
        model = Chapter
        fields = [
            "name",
            "title",
            "slug",
            "link",
            "numimages",
            "updated_at",
        ]


class ComicInfoSerializer(serializers.ModelSerializer[Comic]):
    updated_at = serializers.DateField(format="%d %B, %Y")
    category = CategorySerializer()

    author = AuthorSerializer()
    artist = ArtistSerializer()
    images = serializers.SerializerMethodField(read_only=True)
    related_series = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    users = serializers.SerializerMethodField(read_only=True)
    genres = serializers.SerializerMethodField(read_only=True)
    first_chapter = serializers.SerializerMethodField(read_only=True)
    last_chapter = serializers.SerializerMethodField(read_only=True)
    has_images = serializers.SerializerMethodField(read_only=True)
    has_chapters = serializers.SerializerMethodField(read_only=True)
    rating = serializers.DecimalField(max_digits=10, decimal_places=1)

    def get_genres(self, obj):
        items = obj.genres.all()
        serializer = GenreSerializer(items, many=True)
        return serializer.data

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ComicImageSerializer(items, many=True)
        return serializer.data

    def get_related_series(self, obj):
        category = obj.category.name
        author = obj.author.name
        artist = obj.artist.name
        items = (
            Comic.objects.prefetch_related(
                "comicimages",
                "genres",
                "users",
                "comicchapters",
            )
            .select_related("user", "author", "category", "artist", "website")
            .filter(
                Q(category__name__iexact=category)
                | Q(author__name__icontains=author)
                | Q(artist__name__icontains=artist),
            )[0:5]
        )
        serializer = ComicSerializer(items, many=True)
        return serializer.data

    def get_chapters(self, obj):
        items = obj.get_chapters()
        serializer = ChapterSerializer(items, many=True)
        return serializer.data

    def get_comments(self, obj):
        items = obj.get_comments()
        serializer = CommentSerializer(items, many=True)
        return serializer.data

    def get_users(self, obj):
        items = obj.get_users()
        serializer = UserSerializer(items, many=True)
        return serializer.data

    def get_has_images(self, obj):
        return obj.has_images

    def get_has_chapters(self, obj):
        return obj.has_chapters

    def get_first_chapter(self, obj):
        items = obj.get_chapters().last()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    def get_last_chapter(self, obj):
        items = obj.get_chapters().first()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    class Meta:
        model = Comic
        fields = [
            "title",
            "slug",
            "description",
            "rating",
            "numchapters",
            "numimages",
            "updated_at",
            "serialization",
            "status",
            "link",
            "category",
            "author",
            "artist",
            "genres",
            "images",
            "chapters",
            "comments",
            "users",
            "related_series",
            "first_chapter",
            "last_chapter",
            "has_images",
            "has_chapters",
        ]


class ComicsInfoSerializer(ComicSerializer):
    category = CategorySerializer(read_only=True)
    author = AuthorSerializer(required=False, read_only=True)
    artist = ArtistSerializer(required=False, read_only=True)
    images = serializers.SerializerMethodField(read_only=True)
    related_series = serializers.SerializerMethodField(read_only=True)
    genres = serializers.SerializerMethodField(read_only=True)
    first_chapter = serializers.SerializerMethodField(read_only=True)
    last_chapter = serializers.SerializerMethodField(read_only=True)
    has_images = serializers.SerializerMethodField(read_only=True)
    has_chapters = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)
    rating = serializers.DecimalField(max_digits=10, decimal_places=1)

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ComicImageSerializer(items, many=True)
        return serializer.data

    def get_related_series(self, obj):
        category = obj.category.name
        author = obj.author.name
        artist = obj.artist.name
        items = (
            Comic.objects.prefetch_related(
                "comicimages",
                "genres",
                "users",
                "comicchapters",
            )
            .select_related("user", "author", "category", "artist", "website")
            .filter(
                Q(category__name__iexact=category)
                | Q(author__name__icontains=author)
                | Q(artist__name__icontains=artist),
            )[0:5]
        )
        serializer = ComicSerializer(items, many=True)
        return serializer.data

    def get_genres(self, obj):
        items = obj.genres.all()
        serializer = GenreSerializer(items, many=True)
        return serializer.data

    def get_chapters(self, obj):
        items = obj.get_chapters()[0:3]
        serializer = ChapterSerializer(items, many=True)
        return serializer.data

    def get_has_images(self, obj):
        return obj.has_images

    def get_has_chapters(self, obj):
        return obj.has_chapters

    def get_first_chapter(self, obj):
        items = obj.get_chapters().last()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    def get_last_chapter(self, obj):
        items = obj.get_chapters().first()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    class Meta:
        model = Comic
        fields = [
            "title",
            "slug",
            "description",
            "rating",
            "numchapters",
            "numimages",
            "updated_at",
            "serialization",
            "status",
            "link",
            "category",
            "author",
            "artist",
            "genres",
            "images",
            "related_series",
            "chapters",
            "first_chapter",
            "last_chapter",
            "has_images",
            "has_chapters",
        ]


class ChapterInfoSerializer(serializers.ModelSerializer[Chapter]):
    updated_at = serializers.DateField(format="%d %B, %Y")
    images = serializers.SerializerMethodField(read_only=True)
    related_series = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    has_images = serializers.SerializerMethodField(read_only=True)
    comic = ComicsInfoSerializer()

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ChapterImageSerializer(items, many=True)
        return serializer.data

    def get_related_series(self, obj):
        category = obj.comic.category.name
        author = obj.comic.author.name
        artist = obj.comic.artist.name
        items = (
            Comic.objects.prefetch_related(
                "comicimages",
                "genres",
                "users",
                "comicchapters",
            )
            .select_related("user", "author", "category", "artist", "website")
            .filter(
                Q(category__name__iexact=category)
                | Q(author__name__icontains=author)
                | Q(artist__name__icontains=artist),
            )
        )
        serializer = ComicSerializer(items, many=True)
        return serializer.data

    def get_comments(self, obj):
        items = obj.get_comments()
        serializer = CommentSerializer(items, many=True)
        return serializer.data

    def get_has_images(self, obj):
        return obj.has_images

    class Meta:
        model = Chapter
        fields = [
            "name",
            "title",
            "slug",
            "link",
            "numimages",
            "updated_at",
            "comic",
            "images",
            "related_series",
            "comments",
            "has_images",
        ]


class ChaptersInfoSerializer(serializers.ModelSerializer[Chapter]):
    updated_at = serializers.DateField(format="%d %B, %Y")
    comic = ComicSerializer()
    related_series = serializers.SerializerMethodField(read_only=True)

    def get_related_series(self, obj):
        category = obj.comic.category.name
        author = obj.comic.author.name
        artist = obj.comic.artist.name
        items = (
            Comic.objects.prefetch_related(
                "comicimages",
                "genres",
                "users",
                "comicchapters",
            )
            .select_related("user", "author", "category", "artist", "website")
            .filter(
                Q(category__name__iexact=category)
                | Q(author__name__icontains=author)
                | Q(artist__name__icontains=artist),
            )
        )
        serializer = ComicSerializer(items, many=True)
        return serializer.data

    class Meta:
        model = Chapter
        fields = [
            "name",
            "title",
            "slug",
            "link",
            "numimages",
            "related_series",
            "updated_at",
            "comic",
        ]
