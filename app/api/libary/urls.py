from django.urls import path

from api.libary.views import chapter_views
from api.libary.views import comic_views

app_name = "libary"

urlpatterns = [
    path(
        "comics/",
        view=comic_views.comic_list_view,
        name="comic_list",
    ),
    path(
        "comic/create/",
        view=comic_views.comic_create_view,
        name="comic_create",
    ),
    path(
        "comic/<str:slug>/",
        view=comic_views.comic_detail_view,
        name="comic_detail",
    ),
    path(
        "comic/<str:slug>/update/",
        view=comic_views.comic_update_view,
        name="comic_update",
    ),
    path(
        "comic/<str:slug>/delete/",
        view=comic_views.comic_delete_view,
        name="comic_delete",
    ),
    path(
        "chapters/",
        view=chapter_views.chapter_list_view,
        name="chapter_list",
    ),
    path(
        "chapter/<str:slug>/",
        view=chapter_views.chapter_detail_view,
        name="chapter_detail",
    ),
]
