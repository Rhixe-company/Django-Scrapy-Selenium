from django.urls import path

from api.libary.views import comic_image_views as views

app_name = "comicimages"

urlpatterns = [
    path(
        "<str:slug>/image/create/",
        view=views.create_view,
        name="create",
    ),
    path(
        "<str:slug>/image/<int:pk>/update/",
        view=views.update_view,
        name="update",
    ),
    path(
        "<str:slug>/image/<int:pk>/delete/",
        view=views.delete_view,
        name="delete",
    ),
]
