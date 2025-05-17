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
    class Meta:
        model = ComicImage
        fields = [
            "link",
            "image",
            "status",
            "checksum",
        ]


class ChapterImageSerializer(serializers.ModelSerializer[ChapterImage]):
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
    category = CategorySerializer()
    genre = GenreSerializer()
    author = AuthorSerializer()
    artist = ArtistSerializer()

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
            "website",
            "category",
            "author",
            "artist",
            "genres",
            "url",
        ]

        extra_kwargs = {
            "url": {"view_name": "api:comic-detail", "lookup_field": "slug"},
        }


class ChapterSerializer(serializers.ModelSerializer[Chapter]):

    class Meta:
        model = Chapter
        fields = [
            "name",
            "title",
            "slug",
            "website",
            "numimages",
            "updated_at",
            "comic",
        ]


class ComicInfoSerializer(serializers.ModelSerializer[Comic]):
    images = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)
    first_chapter = serializers.SerializerMethodField(read_only=True)
    last_chapter = serializers.SerializerMethodField(read_only=True)

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ComicImageSerializer(items, many=True)
        return serializer.data

    def get_chapters(self, obj):
        items = obj.get_chapters()
        serializer = ChapterSerializer(items, many=True)
        return serializer.data

    def get_first_chapter(self, obj):
        items = obj.get_chapters().first()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    def get_last_chapter(self, obj):
        items = obj.get_chapters().last()
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
            "website",
            "category",
            "author",
            "artist",
            "genres",
            "images",
            "chapters",
            "first_chapter",
            "last_chapter",
            "url",
        ]

        extra_kwargs = {
            "url": {"view_name": "api:comic-detail", "lookup_field": "slug"},
        }


class ComicsInfoSerializer(serializers.ModelSerializer[Comic]):
    images = serializers.SerializerMethodField(read_only=True)

    first_chapter = serializers.SerializerMethodField(read_only=True)
    last_chapter = serializers.SerializerMethodField(read_only=True)

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ComicImageSerializer(items, many=True)
        return serializer.data

    def get_first_chapter(self, obj):
        items = obj.get_chapters().first()
        serializer = ChapterSerializer(items, many=False)
        return serializer.data

    def get_last_chapter(self, obj):
        items = obj.get_chapters().last()
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
            "website",
            "category",
            "author",
            "artist",
            "genres",
            "images",
            "first_chapter",
            "last_chapter",
            "url",
        ]

        extra_kwargs = {
            "url": {"view_name": "api:comic-detail", "lookup_field": "slug"},
        }


class ChapterInfoSerializer(serializers.ModelSerializer[Chapter]):
    images = serializers.SerializerMethodField(read_only=True)
    comic = ComicSerializer()

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ChapterImageSerializer(items, many=True)
        return serializer.data

    class Meta:
        model = Chapter
        fields = [
            "name",
            "title",
            "slug",
            "website",
            "numimages",
            "updated_at",
            "comic",
            "images",
        ]


class ChaptersInfoSerializer(serializers.ModelSerializer[Chapter]):
    comic = ComicSerializer()

    class Meta:
        model = Chapter
        fields = [
            "name",
            "title",
            "slug",
            "website",
            "numimages",
            "updated_at",
            "comic",
        ]
