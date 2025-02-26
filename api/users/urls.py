from django.urls import path

from api.users import views

app_name = "users"
normalurlpatterns = [
    path(
        "",
        view=views.user_list_view,
        name="user_list",
    ),
    path("~redirect/", view=views.user_redirect_view, name="redirect_user"),
    path(
        "<int:id>/",
        view=views.user_detail_view,
        name="user_detail",
    ),
    path("<int:id>/update/", view=views.user_update_view, name="update_user"),
    path(
        "<int:id>/delete/",
        view=views.user_delete_view,
        name="delete_user",
    ),
    path(
        "remove/users/",
        view=views.user_delete_all_view,
        name="delete_all_users",
    ),
    path(
        "add/",
        view=views.user_create_view,
        name="add_user",
    ),
]

htmxurlpatterns = [
    path(
        "hx/<int:id>/",
        view=views.user_detail_hx_view,
        name="hx_user_detail",
    ),
]
urlpatterns = normalurlpatterns + htmxurlpatterns
