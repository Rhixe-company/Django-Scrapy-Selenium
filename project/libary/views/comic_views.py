from datetime import timedelta

from django.utils.timezone import now
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from project.libary.filters import ComicFilter
from project.libary.models import Comic
from project.libary.serializers import ComicSerializer


class ComicFeaturedAPIView(APIView):
    def get(self, request):
        onemonth = now() - timedelta(weeks=4)
        qs = (
            Comic.objects.get_updated_at(onemonth)  # type: ignore  # noqa: PGH003
            .prefetch_related(
                "comicimages",
                "comicchapters",
                "genres",
                "followers",
            )
            .select_related("author", "category", "artist", "user")
        )
        serializer = ComicSerializer(
            qs[0:5],
            many=True,
        )
        return Response(serializer.data)


comic_featured = ComicFeaturedAPIView.as_view()


class ComicTopAPIView(APIView):
    def get(self, request):
        qs = (
            Comic.objects.get_rating(9.9)  # type: ignore  # noqa: PGH003
            .prefetch_related(
                "comicimages",
                "comicchapters",
                "genres",
                "followers",
            )
            .select_related("author", "category", "artist", "user")
        )
        serializer = ComicSerializer(
            qs[0:8],
            many=True,
        )
        return Response(serializer.data)


comic_top = ComicTopAPIView.as_view()


class ComicListAPIView(generics.ListCreateAPIView):
    queryset = Comic.objects.prefetch_related(
        "comicimages",
        "comicchapters",
        "genres",
        "followers",
    ).select_related("author", "category", "artist", "user")
    serializer_class = ComicSerializer
    filterset_class = ComicFilter
    filter_backends = [
        DjangoFilterBackend,  # type: ignore  # noqa: PGH003
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["title", "description"]
    ordering_fields = ["title", "rating", "updated_at"]

    def get_queryset(self):
        return super().get_queryset()

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


comic_list = ComicListAPIView.as_view()


class ComicDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = (
        Comic.objects.prefetch_related(
            "comicimages",
            "comicchapters",
            "genres",
            "followers",
        )
        .select_related("author", "category", "artist", "user")
        .all()
    )
    serializer_class = ComicSerializer
    lookup_url_kwarg = "comic_id"

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


comic_detail = ComicDetailAPIView.as_view()
