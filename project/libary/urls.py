from django.urls import path
from rest_framework.routers import DefaultRouter

from project.libary.views import artist_views
from project.libary.views import author_views
from project.libary.views import category_views
from project.libary.views import chapter_image_views
from project.libary.views import chapter_views
from project.libary.views import comic_image_views
from project.libary.views import comic_views
from project.libary.views import comment_views
from project.libary.views import genre_views
from project.libary.views import user_item_views
from project.libary.views import user_views

app_name = "api"

urlpatterns = [
    path("comics/", comic_views.comic_list),
    path("comics/top/", comic_views.comic_top),
    path("comics/featured/", comic_views.comic_featured),
    path("comics/<str:comic_id>/", comic_views.comic_detail),
    path("chapters/", chapter_views.chapter_list),
    path("chapters/<str:chapter_id>/", chapter_views.chapter_detail),
    path("categorys/", category_views.category_list),
    path("categorys/<int:id>/", category_views.category_detail),
    path("authors/", author_views.author_list),
    path("authors/<int:id>/", author_views.author_detail),
    path("artists/", artist_views.artist_list),
    path("artists/<int:id>/", artist_views.artist_detail),
    path("genres/", genre_views.genre_list),
    path("genres/<int:id>/", genre_views.genre_detail),
    path("token/", user_views.user_token, name="token_obtain_pair"),
    path("users/", user_views.user_list),
    path("users/<int:id>/", user_views.user_detail),
    path("comments/", comment_views.comment_list),
    path("comments/<int:id>/", comment_views.comment_detail),
    path("comic_images/", comic_image_views.comic_image_list),
    path("comic_images/<str:comic_image_id>/", comic_image_views.comic_image_detail),
    path("chapter_images/", chapter_image_views.chapter_image_list),
    path(
        "chapter_images/<str:chapter_image_id>/",
        chapter_image_views.chapter_image_detail,
    ),
]

router = DefaultRouter()
router.register("useritems", user_item_views.UserItemViewSet)
urlpatterns += router.urls
