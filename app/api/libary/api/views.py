from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.libary.models import Chapter
from api.libary.models import Comic

from .serializers import ChapterSerializer
from .serializers import ComicSerializer


class ComicViewSet(
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = ComicSerializer
    queryset = Comic.objects.all()
    lookup_field = "slug"

    def get_queryset(self, *args, **kwargs):
        return self.queryset.all()  # type: ignore  # noqa: PGH003

    @action(detail=False)
    def me(self, request):
        serializer = ComicSerializer(request.comic, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class ChapterViewSet(
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()
    lookup_field = "slug"

    def get_queryset(self, *args, **kwargs):
        return self.queryset.all()  # type: ignore  # noqa: PGH003

    @action(detail=False)
    def me(self, request):
        serializer = ChapterSerializer(request.chapter, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)
