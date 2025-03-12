from django.urls import resolve
from django.urls import reverse

from api.users.models import User


def test_detail(user: User):
    assert reverse("users:user_detail", kwargs={"id": user.id}) == f"/users/{user.id}/"  # type: ignore  # noqa: PGH003
    assert resolve(f"/users/{user.id}/").view_name == "users:user_detail"  # type: ignore  # noqa: PGH003


def test_update(user: User):
    assert (
        reverse("users:update_user", kwargs={"id": user.id})  # type: ignore  # noqa: PGH003
        == f"/users/{user.id}/update/"  # type: ignore  # noqa: PGH003
    )
    assert resolve(f"/users/{user.id}/update/").view_name == "users:update_user"  # type: ignore  # noqa: PGH003


def test_redirect():
    assert reverse("users:redirect_user") == "/users/~redirect/"
    assert resolve("/users/~redirect/").view_name == "users:redirect_user"
