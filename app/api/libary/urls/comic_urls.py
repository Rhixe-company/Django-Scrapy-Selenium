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
        "<str:slug>/",
        view=views.comic_detail,
        name="detail",
    ),
]
