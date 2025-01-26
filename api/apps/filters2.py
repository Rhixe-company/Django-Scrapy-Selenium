import django_filters
from django import forms
from django.db import models

from api.apps.models import Comic
from api.apps.models import Type


class ComicFilter(django_filters.FilterSet):
    price = django_filters.NumberFilter()
    price__gt = django_filters.NumberFilter(field_name="price", lookup_expr="gt")
    price__lt = django_filters.NumberFilter(field_name="price", lookup_expr="lt")

    release_year = django_filters.NumberFilter(
        field_name="release_date",
        lookup_expr="year",
    )
    release_year__gt = django_filters.NumberFilter(
        field_name="release_date",
        lookup_expr="year__gt",
    )
    release_year__lt = django_filters.NumberFilter(
        field_name="release_date",
        lookup_expr="year__lt",
    )

    manufacturer__name = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Comic
        fields = ["price", "release_date", "manufacturer"]


class ComicFilter1(django_filters.FilterSet):
    class Meta:
        model = Comic
        fields = ["price", "release_date"]


class ComicFilter2(django_filters.FilterSet):
    class Meta:
        model = Comic
        fields = {
            "price": ["lt", "gt"],
            "release_date": ["exact", "year__gt"],
        }


class ComicFilter3(django_filters.FilterSet):
    class Meta:
        model = Comic
        fields = ["manufacturer__country"]


class ComicFilter4(django_filters.FilterSet):
    class Meta:
        model = Comic
        fields = {
            "name": ["exact"],
            "release_date": ["isnull"],
        }
        filter_overrides = {
            models.CharField: {
                "filter_class": django_filters.CharFilter,
                "extra": lambda f: {
                    "lookup_expr": "icontains",
                },
            },
            models.BooleanField: {
                "filter_class": django_filters.BooleanFilter,
                "extra": lambda f: {
                    "widget": forms.CheckboxInput,
                },
            },
        }


class TypeFilter(django_filters.FilterSet):
    class Meta:
        model = Type
        fields = [...]

    @property
    def qs(self):
        parent = super().qs
        author = getattr(self.request, "user", None)

        return parent.filter(is_published=True) | parent.filter(author=author)


def types(request):
    if request is None:
        return Type.objects.none()

    return Type.objects.all()


class TypeFilter1(django_filters.FilterSet):
    type = django_filters.ModelChoiceFilter(queryset=types)


class F(django_filters.FilterSet):
    title = django_filters.CharFilter(method="my_custom_filter")

    class Meta:
        model = Comic
        fields = ["title"]

    def my_custom_filter(self, queryset, name, value):
        return queryset.filter(
            **{
                name: value,
            },
        )
