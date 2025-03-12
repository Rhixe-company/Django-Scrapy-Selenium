from django.urls import path

from api.apps.views import chapter_views as views

app_name = "chapters"
normalurlpatterns = [
    path(
        "",
        view=views.chapter_list_view,
        name="chapter_list",
    ),
    path(
        "remove/images/",
        view=views.chapter_image_delete_all_view,
        name="delete_all_chapter_image",
    ),
    path(
        "remove/chapters/",
        view=views.chapter_delete_all_view,
        name="delete_all_chapters",
    ),
    path(
        "remove/images/",
        view=views.chapter_image_delete_all_view,
        name="delete_all_chapter_image",
    ),
    path(
        "add/",
        view=views.chapter_create_view,
        name="add_chapter",
    ),
    path(
        "<str:slug>/edit/",
        view=views.chapter_update_view,
        name="update_chapter",
    ),
    path(
        "<str:slug>/delete/",
        view=views.chapter_delete_view,
        name="delete_chapter",
    ),
    path(
        "<str:slug>/",
        view=views.chapter_detail_view,
        name="chapter_detail",
    ),
]

htmxurlpatterns = [
    path(
        "hx/<str:slug>/",
        view=views.chapter_detail_hx_view,
        name="hx_chapter_detail",
    ),
    path(
        "hx/<str:parent_slug>/image/<int:id>/",
        view=views.chapter_image_update_hx_view,
        name="hx_image_update",
    ),
    path(
        "hx/<str:parent_slug>/image/",
        view=views.chapter_image_update_hx_view,
        name="hx_image_create",
    ),
    path(
        "hx/<str:parent_slug>/image/delete/<int:id>/",
        view=views.chapter_image_delete_view,
        name="delete_chapter_image",
    ),
]
urlpatterns = normalurlpatterns + htmxurlpatterns
