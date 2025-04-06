from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated

from project.libary.models import Chapter
from project.libary.serializers import ChapterSerializer


class ChapterListAPIView(generics.ListCreateAPIView):
    queryset = (
        Chapter.objects.prefetch_related(
            "chapterimages",
        )
        .select_related("comic")
        .all()
    )
    serializer_class = ChapterSerializer
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


chapter_list = ChapterListAPIView.as_view()


class ChapterDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = (
        Chapter.objects.prefetch_related(
            "chapterimages",
        )
        .select_related("comic")
        .all()
    )
    serializer_class = ChapterSerializer
    lookup_url_kwarg = "chapter_id"

    def get_permissions(self):
        self.permission_classes = [IsAuthenticated]
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


chapter_detail = ChapterDetailAPIView.as_view()
