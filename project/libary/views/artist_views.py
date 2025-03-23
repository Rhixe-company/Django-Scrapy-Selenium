from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser

from project.libary.models import Artist
from project.libary.serializers import ArtistSerializer


class ArtistListAPIView(generics.ListCreateAPIView):
    queryset = Artist.objects.prefetch_related(
        "comicartist",
    ).all()
    serializer_class = ArtistSerializer
    filter_backends = [
        DjangoFilterBackend,  # type: ignore  # noqa: PGH003
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    def get_queryset(self):
        return super().get_queryset()

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


artist_list = ArtistListAPIView.as_view()


class ArtistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.prefetch_related(
        "comicartist",
    ).all()
    serializer_class = ArtistSerializer
    lookup_url_kwarg = "id"

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


artist_detail = ArtistDetailAPIView.as_view()
