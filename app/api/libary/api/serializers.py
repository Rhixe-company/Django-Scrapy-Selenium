from rest_framework import serializers

from api.libary.models import Chapter
from api.libary.models import ChapterImage
from api.libary.models import Comic
from api.libary.models import ComicImage


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


class ChaptersSerializer(serializers.ModelSerializer[Chapter]):

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


class ComicImageSerializer(serializers.ModelSerializer[ComicImage]):
    class Meta:
        model = ComicImage
        fields = [
            "link",
            "image",
            "status",
            "checksum",
        ]


class ComicSerializer(serializers.ModelSerializer[Comic]):
    images = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)

    def get_images(self, obj):
        items = obj.get_images()
        serializer = ComicImageSerializer(items, many=True)
        return serializer.data

    def get_chapters(self, obj):
        items = obj.get_chapters()
        serializer = ChaptersSerializer(items, many=True)
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
            "url",
        ]

        extra_kwargs = {
            "url": {"view_name": "api:comic-detail", "lookup_field": "slug"},
        }


class ChapterSerializer(serializers.ModelSerializer[Chapter]):
    images = serializers.SerializerMethodField(read_only=True)

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
