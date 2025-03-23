from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from project.libary.filters import UserItemFilter
from project.libary.models import UserItem
from project.libary.serializers import UserItemSerializer


class UserItemViewSet(viewsets.ModelViewSet):
    queryset = UserItem.objects.select_related("user", "comic")
    serializer_class = UserItemSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    filterset_class = UserItemFilter
    filter_backends = [DjangoFilterBackend]  # type: ignore  # noqa: PGH003

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        # can also check if POST: if self.request.method == 'POST'
        if self.action in ("create", "update"):
            return UserItemSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff:  # type: ignore  # noqa: PGH003
            qs = qs.filter(user=self.request.user)
        return qs
