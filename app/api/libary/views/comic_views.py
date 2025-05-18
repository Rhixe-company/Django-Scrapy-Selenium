from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser

from api.libary.models import Comic
from api.libary.pagination import StandardResultsSetPagination
from api.libary.serializers import ComicInfoSerializer
from api.libary.serializers import ComicsInfoSerializer


class ComicListAPIView(generics.ListCreateAPIView):
    queryset = (
        Comic.objects.prefetch_related(
            "comicimages",
            "genres",
            "users",
            "comicchapters",
        )
        .select_related("user", "author", "category", "artist", "website")
        .all()
    )
    serializer_class = ComicsInfoSerializer
    filter_backends = [
        DjangoFilterBackend,  # type: ignore  # noqa: PGH003
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    pagination_class = StandardResultsSetPagination

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
            "genres",
            "users",
            "comicchapters",
        )
        .select_related("user", "author", "category", "artist", "website")
        .all()
    )
    serializer_class = ComicInfoSerializer
    lookup_url_kwarg = "slug"
    lookup_field = "slug"

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


comic_detail = ComicDetailAPIView.as_view()
