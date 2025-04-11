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
        "comic/create/",
        view=views.create_view,
        name="create",
    ),
    path(
        "comic/<str:slug>/",
        view=views.detail_view,
        name="detail",
    ),
    path(
        "comic/<str:slug>/update/",
        view=views.update_view,
        name="update",
    ),
    path(
        "comic/<str:slug>/delete/",
        view=views.delete_view,
        name="delete",
    ),
]
