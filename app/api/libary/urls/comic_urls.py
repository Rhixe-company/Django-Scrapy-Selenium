from django.urls import path

from api.libary.views import comic_views as views

app_name = "comics"

urlpatterns = [
    path(
        "",
        view=views.list_view,
        name="list",
    ),
    path(
        "create/",
        view=views.create_view,
        name="create",
    ),
    path(
        "<str:slug>/",
        view=views.detail_view,
        name="detail",
    ),
    path(
        "<str:slug>/update/",
        view=views.update_view,
        name="update",
    ),
    path(
        "<str:slug>/delete/",
        view=views.delete_view,
        name="delete",
    ),
]
