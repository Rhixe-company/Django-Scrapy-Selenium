from django.urls import path

from api.libary.views import chapter_views as views

app_name = "chapters"

urlpatterns = [
    path(
        "",
        view=views.list_view,
        name="list",
    ),
    path(
        "chapter/<str:slug>/",
        view=views.detail_view,
        name="detail",
    ),
]
