from django.db import models
from django.db.models import Q


class ComicQuerySet(models.QuerySet):
    def query_search(self, titlequery: str | None, slugquery: str | None):
        if titlequery is None or titlequery == "":
            return self.none()
        if slugquery is None or slugquery == "":
            return self.none()
        lookups = Q(title__exact=titlequery) | Q(slug__exact=slugquery)
        return self.filter(lookups)

    def query_updated_at(self, query: str | None):
        if query is None or query == "":
            return self.none()
        lookups = Q(updated_at__gte=query)
        return self.filter(lookups)


class ComicManager(models.Manager):
    def get_queryset(self):
        return ComicQuerySet(self.model, using=self._db)

    def get_search(self, titlequery: str | None, slugquery: str | None):
        return self.get_queryset().query_search(
            titlequery=titlequery,
            slugquery=slugquery,
        )

    def get_updated_at(self, query: str | None):
        return self.get_queryset().query_updated_at(query=query)


class ChapterQuerySet(models.QuerySet):
    def query_search(self, slugquery: str | None):
        if slugquery is None or slugquery == "":
            return self.none()
        lookups = Q(slug__exact=slugquery)
        return self.filter(lookups)


class ChapterManager(models.Manager):
    def get_queryset(self):
        return ChapterQuerySet(self.model, using=self._db)

    def get_search(self, slugquery: str | None):
        return self.get_queryset().query_search(
            slugquery=slugquery,
        )
