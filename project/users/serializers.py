from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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
            "full_name",
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
