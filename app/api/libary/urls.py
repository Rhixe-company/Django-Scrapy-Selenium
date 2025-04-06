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
        "comic/<str:slug>/",
        view=comic_views.comic_detail_view,
        name="comic_detail",
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
