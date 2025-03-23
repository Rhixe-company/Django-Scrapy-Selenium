from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from project.libary.models import Artist
from project.libary.models import Author
from project.libary.models import Category
from project.libary.models import Chapter
from project.libary.models import ChapterImage
from project.libary.models import Comic
from project.libary.models import ComicImage
from project.libary.models import Comment
from project.libary.models import Genre
from project.libary.models import UserItem
from project.users.models import User


class UserSerializer(serializers.ModelSerializer[User]):
    token = serializers.SerializerMethodField(
        read_only=True,
        method_name="load_token",
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "image",
            "password",
            "is_staff",
            "token",
        )

    def load_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data  # type: ignore  # noqa: PGH003
        for k, v in serializer.items():
            data[k] = v

        return data


class CategorySerializer(serializers.ModelSerializer[Category]):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
        )


class AuthorSerializer(serializers.ModelSerializer[Author]):
    class Meta:
        model = Author
        fields = (
            "id",
            "name",
        )


class ArtistSerializer(serializers.ModelSerializer[Artist]):
    class Meta:
        model = Artist
        fields = (
            "id",
            "name",
        )


class GenreSerializer(serializers.ModelSerializer[Genre]):
    class Meta:
        model = Genre
        fields = (
            "id",
            "name",
        )


class ComicImageSerializer(serializers.ModelSerializer[ComicImage]):
    comic_id = serializers.CharField(source="comic.comic_id")

    class Meta:
        model = ComicImage
        fields = (
            "comic_image_id",
            "link",
            "image",
            "status",
            "comic_id",
        )


class ChapterImageSerializer(serializers.ModelSerializer[ChapterImage]):
    comic_id = serializers.CharField(source="comic.comic_id")
    chapter_id = serializers.CharField(source="chapter.chapter_id")

    class Meta:
        model = ChapterImage
        fields = (
            "chapter_image_id",
            "link",
            "image",
            "status",
            "comic_id",
            "chapter_id",
        )


class ChapterSerializer(serializers.ModelSerializer[Chapter]):
    comic_id = serializers.CharField(source="comic.comic_id")
    comic_title = serializers.CharField(source="comic.title")
    updated_at = serializers.DateField()
    chapterimages = ChapterImageSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = (
            "comic_id",
            "comic_title",
            "chapter_id",
            "name",
            "slug",
            "title",
            "spider",
            "link",
            "updated_at",
            "created_at",
            "has_images",
            "numimages",
            "chapterimages",
        )


class ComicSerializer(serializers.ModelSerializer[Comic]):
    category = CategorySerializer(many=False, read_only=True)
    author = AuthorSerializer(many=False, read_only=True)
    artist = ArtistSerializer(many=False, read_only=True)
    updated_at = serializers.DateField()
    genres = GenreSerializer(many=True, read_only=True)
    comicimages = ComicImageSerializer(many=True, read_only=True)
    comicchapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Comic
        fields = (
            "comic_id",
            "title",
            "slug",
            "description",
            "status",
            "rating",
            "serialization",
            "spider",
            "link",
            "updated_at",
            "created_at",
            "has_images",
            "has_chapters",
            "numimages",
            "numchapters",
            "category",
            "author",
            "artist",
            "genres",
            "comicimages",
            "comicchapters",
        )

    def validate_rating(self, value):
        if value <= 0:
            msg = "Rating must be greater than 0."
            raise serializers.ValidationError(msg)
        return value


class UserItemSerializer(serializers.ModelSerializer[UserItem]):
    user_email = serializers.CharField(source="user.email")
    comic_title = serializers.CharField(source="comic.title")

    class Meta:
        model = UserItem
        fields = (
            "id",
            "order",
            "user_email",
            "comic_title",
        )


class CommentSerializer(serializers.ModelSerializer[Comment]):
    user_email = serializers.CharField(source="user.email")
    comic_title = serializers.CharField(source="comic.title")
    chapter_name = serializers.CharField(source="chapter.name")

    class Meta:
        model = Comment
        fields = (
            "id",
            "text",
            "created_at",
            "user_email",
            "comic_title",
            "chapter_name",
        )
