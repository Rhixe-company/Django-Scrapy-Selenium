from django.db import models
from django.db.models import Q


class ComicQuerySet(models.QuerySet):
    def query_search(self, titlequery=None, slugquery=None):
        if titlequery is None or titlequery == "":
            return self.none()
        if slugquery is None or slugquery == "":
            return self.none()
        lookups = Q(title__iexact=titlequery) | Q(slug__iexact=slugquery)
        return self.filter(lookups)

    def query_title(self, query=None):
        if query is None or query == "":
            return self.none()
        lookups = Q(title__iexact=query)
        return self.filter(lookups)

    def query_rating(self, query=None):
        if query is None or query == "":
            return self.none()
        lookups = Q(rating__gte=query) & Q(status="ongoing")
        return self.filter(lookups)

    def query_updated_at(self, query=None):
        if query is None or query == "":
            return self.none()
        lookups = Q(updated_at__gt=query)
        return self.filter(lookups)


class ComicManager(models.Manager):
    def get_queryset(self):
        return ComicQuerySet(self.model, using=self._db)

    def get_search(self, titlequery=None, slugquery=None):
        return self.get_queryset().query_search(
            titlequery=titlequery,
            slugquery=slugquery,
        )

    def get_title(self, query=None):
        return self.get_queryset().query_title(query=query)

    def get_rating(self, query=None):
        return self.get_queryset().query_rating(query=query)

    def get_updated_at(self, query=None):
        return self.get_queryset().query_updated_at(query=query)


class ChapterQuerySet(models.QuerySet):
    def query_search(self, slugquery=None, comicquery=None):
        if slugquery is None or slugquery == "":
            return self.none()
        if comicquery is None or comicquery == "":
            return self.none()
        lookups = Q(slug__iexact=slugquery) | Q(comic__title__iexact=comicquery)
        return self.filter(lookups)

    def query_name(self, query=None):
        if query is None or query == "":
            return self.none()
        lookups = Q(name__iexact=query)
        return self.filter(lookups)


class ChapterManager(models.Manager):
    def get_queryset(self):
        return ChapterQuerySet(self.model, using=self._db)

    def get_search(self, namequery=None, slugquery=None, comicquery=None):
        return self.get_queryset().query_search(
            slugquery=slugquery,
            comicquery=comicquery,
        )

    def get_name(self, query=None):
        return self.get_queryset().query_name(query=query)
