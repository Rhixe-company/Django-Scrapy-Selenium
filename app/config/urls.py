from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.urls import path
from django.views import defaults as default_views

urlpatterns = [
    path("", include("api.home.urls")),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("users/", include("api.users.urls", namespace="users")),
    # Comic management
    path("comics/", include("api.libary.urls.comic_urls", namespace="comics")),
    # Comic Images management
    path(
        "comicimages/",
        include("api.libary.urls.comic_image_urls", namespace="comicimages"),
    ),
    # Chapter management
    path("chapters/", include("api.libary.urls.chapter_urls", namespace="chapters")),
    # Chapter Images management
    path(
        "chapterimages/",
        include("api.libary.urls.chapter_image_urls", namespace="chapterimages"),
    ),
    # Data Table management
    path("table/", include("api.libary.urls.data_urls")),
    path("accounts/", include("allauth.urls")),
    path("ckeditor5/", include("django_ckeditor_5.urls")),
    # Your stuff: custom urls includes go here
    # ...
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [
            path("__debug__/", include(debug_toolbar.urls)),
            *urlpatterns,
        ]
