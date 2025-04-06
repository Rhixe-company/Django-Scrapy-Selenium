from django.urls import path

from api.libary.views import comic_views

app_name = "libary"

urlpatterns = [
    path(
        "",
        view=comic_views.comic_list_view,
        name="comic_list",
    ),
    path(
        "<str:slug>/",
        view=comic_views.comic_detail_view,
        name="comic_detail",
    ),
]
