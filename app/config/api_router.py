from api.libary.api.views import ChapterViewSet
from api.libary.api.views import ComicViewSet
from api.users.api.views import UserViewSet
from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("comics", ComicViewSet)
router.register("chapters", ChapterViewSet)


app_name = "api"
urlpatterns = router.urls
