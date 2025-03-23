import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class LibaryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "project.libary"

    def ready(self):
        with contextlib.suppress(ImportError):
            import project.libary.signals  # noqa: F401
