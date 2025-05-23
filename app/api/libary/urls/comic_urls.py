from django.urls import path

from api.libary.views import comic_views as views

app_name = "comics"

urlpatterns = [
    path(
        "",
        view=views.comic_list,
        name="list",
    ),
    path(
        "top/",
        view=views.topcomics,
        name="top",
    ),
    path(
        "featured/",
        view=views.featuredcomics,
        name="featured",
    ),
    path(
        "selected/",
        view=views.selectedcomics,
        name="selected",
    ),
    path(
        "<str:slug>/",
        view=views.comic_detail,
        name="detail",
    ),
]
