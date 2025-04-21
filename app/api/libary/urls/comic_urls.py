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
    path(
        "<str:slug>/add_bookmark/",
        view=views.add_bookmark,
        name="add_bookmark",
    ),
    path(
        "<str:slug>/delete_bookmark/",
        view=views.delete_bookmark,
        name="delete_bookmark",
    ),
]
