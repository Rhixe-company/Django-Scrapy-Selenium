from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView

from project.libary.serializers import UserObtainPairSerializer
from project.libary.serializers import UserSerializer
from project.users.models import User


class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.prefetch_related(
        "comicuser",
        "usercomments",
    ).all()
    serializer_class = UserSerializer
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


user_list = UserListAPIView.as_view()


class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.prefetch_related(
        "comicuser",
        "usercomments",
    ).all()
    serializer_class = UserSerializer
    lookup_url_kwarg = "id"

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


user_detail = UserDetailAPIView.as_view()


class UserTokenAPIView(TokenObtainPairView):
    serializer_class = UserObtainPairSerializer


user_token = UserTokenAPIView.as_view()
