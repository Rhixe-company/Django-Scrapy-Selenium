# ruff: noqa: E501
from config.settings.base import *  # noqa: F403
from config.settings.base import BASE_DIR
from config.settings.base import INSTALLED_APPS
from config.settings.base import MIDDLEWARE

# from config.settings.base import WEBPACK_LOADER
from config.settings.base import env

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="Qg206ZCIgUuVxpVrpPKXMfDTlr9FDnTGsLvGYsGB1WCwc9rdVoPyY5kzhv8dLoVz",  # type: ignore  # noqa: PGH003
)
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["localhost"]  # noqa: S104

# CACHES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
# CACHES = {  # noqa: ERA001, RUF100
#     "default": {  # noqa: ERA001, RUF100
#         "BACKEND": "django.core.cache.backends.locmem.LocMemCache",  # noqa: ERA001, RUF100
#         "LOCATION": "",  # noqa: ERA001, RUF100
#     },
# }  # noqa: ERA001, RUF100
CACHES = {  # noqa: ERA001, RUF100
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": CELERY_BROKER_URL,  # noqa: ERA001, F405, RUF100
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
}  # noqa: ERA001, RUF100

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = env(
    "DJANGO_EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",  # type: ignore  # noqa: PGH003
)

# WhiteNoise
# ------------------------------------------------------------------------------
# http://whitenoise.evans.io/en/latest/django.html#using-whitenoise-in-development
INSTALLED_APPS = ["whitenoise.runserver_nostatic", *INSTALLED_APPS]


# django-debug-toolbar
# ------------------------------------------------------------------------------
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#prerequisites
INSTALLED_APPS += ["debug_toolbar"]
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#middleware
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
# https://django-debug-toolbar.readthedocs.io/en/latest/configuration.html#debug-toolbar-config
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": [
        "debug_toolbar.panels.redirects.RedirectsPanel",
        # Disable profiling panel due to an issue with Python 3.12:
        # https://github.com/jazzband/django-debug-toolbar/issues/1875
        "debug_toolbar.panels.profiling.ProfilingPanel",
    ],
    "SHOW_TEMPLATE_CONTEXT": True,
}
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]
if env("USE_DOCKER", default="no") == "yes":  # type: ignore  # noqa: PGH003
    import socket

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS += [".".join(ip.split(".")[:-1] + ["1"]) for ip in ips]
    try:
        _, _, ips = socket.gethostbyname_ex("node")
        INTERNAL_IPS.extend(ips)
    except socket.gaierror:
        # The node container isn't started (yet?)
        pass

# django-extensions
# ------------------------------------------------------------------------------
# https://django-extensions.readthedocs.io/en/latest/installation_instructions.html#configuration
INSTALLED_APPS += ["django_extensions"]
# Celery
# ------------------------------------------------------------------------------

# https://docs.celeryq.dev/en/stable/userguide/configuration.html#task-eager-propagates
CELERY_TASK_EAGER_PROPAGATES = True
# # django-webpack-loader
# # ------------------------------------------------------------------------------
# WEBPACK_LOADER["DEFAULT"]["CACHE"] = not DEBUG
# Your stuff...
# ------------------------------------------------------------------------------
# DATABASES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASE_ENGINE = env(
    "POSTGRES_ENGINE",
    default="django.db.backends.sqlite3",  # type: ignore  # noqa: PGH003
)
DATABASE_HOST = env(
    "POSTGRES_HOST",
    default="",  # type: ignore  # noqa: PGH003
)
DATABASE_PORT = env(
    "POSTGRES_PORT",
    default="",  # type: ignore  # noqa: PGH003
)
DATABASE_DB = env(
    "POSTGRES_DB",
    default="",  # type: ignore  # noqa: PGH003
)
DATABASE_USER = env(
    "POSTGRES_USER",
    default="",  # type: ignore  # noqa: PGH003
)
DATABASE_PASSWORD = env(
    "POSTGRES_PASSWORD",
    default="",  # type: ignore  # noqa: PGH003
)
if DATABASE_ENGINE == "django.db.backends.postgresql":
    DATABASES = {
        "default": {
            "ENGINE": DATABASE_ENGINE,
            "NAME": DATABASE_DB,
            "USER": DATABASE_USER,
            "PASSWORD": DATABASE_PASSWORD,
            "HOST": DATABASE_HOST,
            "PORT": DATABASE_PORT,
        },
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": DATABASE_ENGINE,
            "NAME": BASE_DIR / "api.db",
            "USER": "",
            "PASSWORD": "",
            "HOST": "",
            "PORT": "",
        },
    }
# DATABASES = {"default": env.db("DATABASE_URL")}  # noqa: ERA001
DATABASES["default"]["ATOMIC_REQUESTS"] = True
# STORAGES = {
#     "default": {"BACKEND": "config.storage.CustomStorage"},
#     "staticfiles": {
#         "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
#     },
# }
